//https://www.youtube.com/watch?v=YSEsSs3hB6A&t=159s


document.addEventListener("DOMContentLoaded", () => {
const grid=document.querySelector(".grid")
const ball=document.createElement("div")
let ballLeftSpace= 50
let startPoint=150
let ballBottomSpace= startPoint
let isGameOver= false
let platformCount= 5
let platforms=[] 
let upTimerId
let downTimerId
let isJumping=true
let isGoingLeft=false
let isGoingRight=false
let leftTimerID
let rightTimerId
let score=0

function createBall(){
    grid.appendChild(ball)
    ball.classList.add("ball")
    //ball starts at left 50px
    //ball starts on the left of the first item in the platforms array 
    ballLeftSpace=platforms[0].left 
    ball.style.left= ballLeftSpace + "px"
    ball.style.bottom=ballBottomSpace + "px"
}
//properties of Platform
class Platform{
    constructor(newPlatformBottom){
        this.bottom=newPlatformBottom
        this.left= Math.random()*315 
        this.visual=document.createElement("div")

        const visual= this.visual
        visual.classList.add("platform")
        visual.style.left=this.left+"px"
        visual.style.bottom=this.bottom+"px"
        grid.appendChild(visual)
    }

}
function createPlatforms(){
for (let i=0; i<platformCount; i++){
    let platformSpace= 600/platformCount
    let newPlatformBottom=100+i*platformSpace
let newPlatform= new Platform(newPlatformBottom) 
platforms.push(newPlatform)
console.log(platforms)
}

}
//move the platforms around
function movePlatforms(){
    //if the space from the ball to the bottom is greater than 200px
if(ballBottomSpace>200){
platforms.forEach(platform=>{
    //and there are 4 platforms
platform.bottom-=4
let visual=platform.visual
//create a new platform
visual.style.bottom=platform.bottom + "px"

//if the bottom platform is less than 10px from the bottom of the grid
if (platform.bottom<10){
    //first item of the platform array must be removed
    let firstPlatform= platforms[0].visual
    //remove the platform
    firstPlatform.classList.remove("platform")
    //remove the platform from the screen
    platforms.shift()
    score++
    console.log(platforms)

    let newPlatform= new Platform(600)
    platforms.push(newPlatform)


}
})
     
}

}
function jump(){
    clearInterval(downTimerId)
    isJumping=true
upTimerId=setInterval(function(){
ballBottomSpace+=20
ball.style.bottom=ballBottomSpace+"px"
if (ballBottomSpace>startPoint+200){
    fall()
}
},30)


}
function fall(){
    clearInterval(upTimerId)
    isJumping=false
    downTimerId=setInterval(function(){
ballBottomSpace -=5
ball.style.bottom=ballBottomSpace+"px"
if (ballBottomSpace<=0){
gameOver()

}
platforms.forEach(platform=>{
    if(
        (ballBottomSpace>=platform.bottom)&&
        (ballBottomSpace<=platform.bottom+15)&&
        ((ballLeftSpace + 60) >= platform.left)&&
        (ballLeftSpace<=(platform.left+85  )) &&
        !isJumping
    ){
        console.log("landed")
        startPoint=ballBottomSpace
        jump()
    }
})

    },30)
}
function gameOver(){ 
    console.log("game over")
    isGameOver=true
    while(grid.firstChild){
grid.removeChild(grid.firstChild)

    }
    grid.innerHTML=score
    clearInterval(upTimerId)
    clearInterval(downTimerId)
clearInterval(leftTimerID)
clearInterval(rightTimerId)
 
}


function control(e){
if (e.key==="ArrowLeft"){
    moveLeft()
 } else if (e.key==="ArrowRight"){
moveRight()
 } else if(e.key==="ArrowUp"){
     moveStraight()
 }
}
function moveLeft(){ 
    if(isGoingRight){
        clearInterval(rightTimerId)
        isGoingRight=false
    }
    isGoingLeft=true
    leftTimerId= setInterval(function(){
        if(ballLeftSpace>=0){
        ballLeftSpace-=5
        ball.style.left= ballLeftSpace+"px"
        }else moveRight()

    },20)

}
function moveRight(){
    if(isGoingLeft){
        clearInterval(leftTimerId)
        isGoingLeft=false
    }
isGoingRight=true
rightTimerId=setInterval(function(){
    if(ballLeftSpace<=340){
        ballLeftSpace+=5
        ball.style.left = ballLeftSpace +"px"
    }else moveLeft()

    
},20)

}

function moveStraight(){
isGoingLeft=false
isGoingRight=false 



}


function start(){
    //! means flase
if (!isGameOver){
    createPlatforms()
    createBall()
setInterval(movePlatforms,30)
jump()
document.addEventListener("keyup",control)
}
}

start()

})