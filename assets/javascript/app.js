
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBJbRGTUVTs4zo4RRZnkD7HfAxr-_hx-_s",
    authDomain: "andrei-s-train-project.firebaseapp.com",
    databaseURL: "https://andrei-s-train-project.firebaseio.com",
    projectId: "andrei-s-train-project",
    storageBucket: "andrei-s-train-project.appspot.com",
    // messagingSenderId: "305947936131"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submit-info").on("click", function (event) {
    event.preventDefault();

    // Get the input values
    trainName = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrain = ($("#firstTrainInput").val().trim());
    frequency = $("#frequencyInput").val().trim();
    // Current Time
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    
    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").toString();
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    
    
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        nextTrain: nextTrain,
        tMinutesTillTrain: tMinutesTillTrain,

        dateAddedtm: firebase.database.ServerValue.TIMESTAMP,
    };

    database.ref().push(newTrain);

    // console.log(newTrain.trainName);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstTrain);
    // console.log(newTrain.frequency);

    alert("New train successfully added");

    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
});




database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());


    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;


    var tableRow = $("<tr>");

    var tTrainName = $("<td>").text(childSnapshot.val().trainName);
    tableRow.append(tTrainName);

    var tDestination = $("<td>").text(childSnapshot.val().destination);
    tableRow.append(tDestination);

    var tFrequency = $("<td>").text(childSnapshot.val().frequency);
    tableRow.append(tFrequency);

    var tNextArrival = $("<td>").text(childSnapshot.val().nextTrain);
    tableRow.append(tNextArrival);

    var tMinutesAway = $("<td>").text(childSnapshot.val().tMinutesTillTrain);
    tableRow.append(tMinutesAway);





    $("#trainScheduleTable").append(tableRow);
    // console.log(moment(childSnapshot.val().start).diff(moment(), "months"));
});