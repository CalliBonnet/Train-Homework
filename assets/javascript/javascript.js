
// Firebase Initialize 
var firebaseConfig = {
    apiKey: "AIzaSyDFPJZ3JZCCPlo-SvfJQMB0eq1yhoRj29w",
    authDomain: "trainscheduler-calli.firebaseapp.com",
    databaseURL: "https://trainscheduler-calli.firebaseio.com",
    projectId: "trainscheduler-calli",
    storageBucket: "trainscheduler-calli.appspot.com",
    messagingSenderId: "868445978911",
    appId: "1:868445978911:web:1ed4d57c0f2adf23b0b02a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database(); 

// Firebase Event Listener 
database.ref().on('child_added', function(childSnapshot) {

    var child = childSnapshot.val(); 
    var trainNameDisplayed = childSnapshot.val().dbTrainName; 
    var trainDestinationDisplayed = childSnapshot.val().dbDestination; 
    var trainTimeDisplayed = childSnapshot.val().dbTrainTime; 
    var trainFrequencyDisplayed = childSnapshot.val().dbFrequency; 
    var trainNextArrivalDisplayed = childSnapshot.val().dbNextArrival; 
    var trainMinutesAwayDisplayed = childSnapshot.val().dbMinutesAway; 

    // moment.js 
    var trainTimeConverted = moment(trainTimeDisplayed, "hh:mm"); 
        var timeDifferance = moment().diff(moment(trainTimeConverted), "minutes"); 
        var timeRemainder = timeDifferance % trainFrequencyDisplayed; 
        var minsAway = trainFrequencyDisplayed - timeRemainder; 
    var nextArrival = moment().add(minsAway, "minutes").format("hh:mm"); 

    $('#tbody').append('<tr><td>'+trainNameDisplayed+'</td><td>'+trainDestinationDisplayed+'</td><td>'+trainFrequencyDisplayed+'</td><td>'+nextArrival+'</td><td>'+minsAway+'</td></tr>'); 
}); 
// End of Firebase 

// submit button listener
$('#submitBtn').on('click', function() {
    event.preventDefault(); 

    var newName = $('TrainName').val().trim(); 
    var newDestination = $('TrainDestination').val().trim(); 
    var newTrainTime = moment($('TrainTime').val().trim(), "H:mm").format("X"); 
    var newFrequency = $('TrainFrequency').val().trim(); 
     
    // Clear values when sumbit is clicked 
    $(this).closest('form').find("input[type=text], textarea").val(''); 

    // Push new train information in the firebase database 
    database.ref().push({
        dbTrainName: newName, 
        dbDestination: newDestination, 
        dbTrainTime: newTrainTime, 
        dbFrequency: newFrequency
    }); 
}); 
// end submit button listener
