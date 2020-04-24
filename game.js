var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level=0;
var started = false;


document.addEventListener("keypress", function (event) {
    if(level==0){
        started=true;
        nextSequence();
    }
});


$(".btn").click(function () {
    userClickedPattern.push($(this).attr("id"));
    playSound($(this).attr("id"));
    //console.log(userClickedPattern);
    animationPress($(this).attr("id"));
    checkAnswer(userClickedPattern.length - 1);

    //nextSequence();
});




function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
    //buttonClicked();
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animationPress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        //console.log("success");
        if(gamePattern.length-1==currentLevel){
            userClickedPattern=[];
            setTimeout(nextSequence, 1000);
        }
        
    }else{
        //console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern=[];
}


