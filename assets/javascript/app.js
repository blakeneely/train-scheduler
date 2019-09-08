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

$("#submit-btn").on("click", function(){
    event.preventDefault();
    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: name,
        destination: destination,
        time: time,
        frequency, frequency,
    };

    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    database.ref().push(newTrain);
});

database.ref().on("child_added", function(childsnapshot){
    console.log(childsnapshot.val());

    var name = childsnapshot.val().name;
    var destination = childsnapshot.val().destination;
    var time = childsnapshot.val().time;
    var frequency = childsnapshot.val().frequency;

    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(" "),
        $("<td>").text(" "),
    );

    $("#train-table").append(newRow);
});

