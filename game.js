const  buttonColours =["red","blue","green","yellow"]
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;



$(".btn").click(function () {
    const userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    console.log(userClickedPattern)

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length)

});


$(document).keydown(function () {
    if (!started) {

        nextSequence();

        $("#level-title").text("Level " + level);
        started = true;
    }
});




function  checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1]){
        if (currentLevel === gamePattern.length){
            setTimeout(function() {
                nextSequence()
            }, 1000);

        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver()
    }

}



function startOver(){
    level = 0
    started = false
    gamePattern =[];
}





function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber)

    let randomChosenColor = buttonColours[randomNumber];
    console.log(randomChosenColor)

    gamePattern.push(randomChosenColor)
    console.log(gamePattern)

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    const tom1 = new Audio("sounds/" + randomChosenColor + ".mp3");
    tom1.play();


}


/* עושה את המרובעים בהבזקים - מהמהב */
function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed")
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}




function playSound(name) {
    const tom1 = new Audio("sounds/" + name + ".mp3");
    tom1.play()

}



