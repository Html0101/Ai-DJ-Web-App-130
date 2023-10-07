song = "";
leftWristY = 0;
leftWristX = 0;
rightWristY = 0;
rightWristX = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function setup() 
{ 
    canvas = createCanvas(600, 600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    postNet = ml5.poseNet(video, modelLoaded);
    postNet.on('pose', gotposes);
}

function gotposes(results)
{ 
    if(results.length > 0) 
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+ scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function draw() 
{ 
    image(video, 0, 0 ,600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    circle(rightWristX, rightWristY);
    if(scoreRightWrist > 0.2)
    {
        if(rightWristY>0 && rightWristY <= 100) 
        { 
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200) 
        { 
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300) 
        { 
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400) 
        { 
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(rightWristY > 400 && rightWristY <= 500) 
        { 
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
    }
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function modelLoaded() 
{ 
    console.log("Posenet is initialized");
}



function preload() 
{ 
    song = loadSound("music.mp3");
    song.setVolume(1);
    song.rate(1);
}

function playing() 
{
    song.play();
}