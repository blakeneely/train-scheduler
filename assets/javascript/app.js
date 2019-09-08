// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyC6A42XuayUaOcx2nvHUOLbbXb17pfhLjQ",
authDomain: "train-scheduler-86274.firebaseapp.com",
databaseURL: "https://train-scheduler-86274.firebaseio.com",
projectId: "train-scheduler-86274",
storageBucket: "",
messagingSenderId: "466444663514",
appId: "1:466444663514:web:50c576aaf29f5e89"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
// Event listener for submit button
$("#submit-btn").on("click", function(){
    event.preventDefault();                                                     // Stop default action of submit
    var name = $("#name-input").val().trim();                                   // Stores value of inputs into variables
    var destination = $("#destination-input").val().trim();
    var time = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {                                                            // Store input variables as object
        name: name,
        destination: destination,
        time: time,
        frequency, frequency,
    };

    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    database.ref().push(newTrain);                                              // Push train object to firebase databawse

    $("#name-input").val("");                                                   // Clear input boxes
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val();
});

// Event listener to load objects in database to table
database.ref().on("child_added", function(childsnapshot){
    console.log(childsnapshot.val());

    var name = childsnapshot.val().name;                                        
    var destination = childsnapshot.val().destination;
    var time = childsnapshot.val().time;
    var frequency = childsnapshot.val().frequency;

    var currentTime = moment();                                                 // Save user's current time to variable
    var diffTime = moment().diff(moment.unix(time), "minutes");                 // Different in minutes from first train time entered
    var remainder = diffTime % frequency;                                       // Get remainder from time apart and frequency
    var minutes = frequency - remainder;                                        // Get minutes from remainder
    var nextTrain = moment().add(minutes, 'minutes');                           // Get minutes for next train
    var nextTrainFormat = moment(nextTrain).format('LT');                         // Make format pretty

    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrainFormat),
        $("<td>").text(minutes),
    );

    $("#train-table").append(newRow);
});

