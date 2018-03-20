// JavaScript source code
var config = {
    apiKey: "AIzaSyBBYYtJxtoya5flPSuV75igU9xOrw8b9xY",
    authDomain: "cohourtbootcamp2018.firebaseapp.com",
    databaseURL: "https://cohourtbootcamp2018.firebaseio.com",
    projectId: "cohourtbootcamp2018",
    storageBucket: "cohourtbootcamp2018.appspot.com",
    messagingSenderId: "12238763526"
};
firebase.initializeApp(config);

var database = firebase.database();


//grabs information from the form
$("#submit").on("click", function () {
    var trainName = $('#trainNameInput').val().trim();
    var destination = $('#destinationInput').val().trim();
    var firstTime = $('#firstTrain').val().trim();
    var tFrequency = $("#frequencyInput").val().trim();

    $("input").val('');
    return false;
});

database.ref().on("child_added", function (childSnapshot) {

    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTrain;
    var tFrequency = childSnapshot.val().frequency;


    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    //First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // the time difference between current time and the first train
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
});


$("#trainTable").append()("<tr><td>" + name + "</td><td>" + destination + "</td><td>" tFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");