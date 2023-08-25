var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;
    $("h1").text("Level " + level);
   
    
}

$(".btn").click(function () {
    var userChosenColour = this.id;
 
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);


});

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, "100");
}

$(document).keypress(function () {

    if (!started) {

        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("sucess");

        if(currentLevel==gamePattern.length-1)
        {
            setTimeout(function(){
                nextSequence();
                userClickedPattern.length=0;
            },800)
        }
    }
    else
    {
        console.log("wrong");
        if(started)
        {
            playSound("wrong")
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
    
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
    
            startOver();
        }
    }
}


function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
    userClickedPattern=[];
}


