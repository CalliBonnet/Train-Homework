$(document).ready(function () { 

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


    //when the user clicks the submit button ===> add a train 
    $('#submitBtn').on("click", function (event) {
        event.preventDefault();

        //train name 
        var newName = $('#TrainName')
            .val()
            .trim();

        //train destination 
        var newDestination = $('#TrainDestination')
            .val()
            .trim();

        //time input of the new train 
        var newTrainTime = $('#TrainTime')
            .val()
            .trim();

        //train Frequency 
        var newFrequency = $('#TrainFrequency')
            .val()
            .trim();

        var newTrain = {
            name: newName,
            destination: newDestination,
            trainTime: newTrainTime,
            frequency: newFrequency
        };

        //PUSH the new train into FireBase Database 
        database.ref().push(newTrain);


        //clear the form when user clicks submit 
        $('#TrainName').val('');
        $('#TrainDestination').val('');
        $('#TrainTime').val('');
        $('#TrainFrequency').val('');
    });



    // Firebase Event Listener 
    database.ref().on('child_added', function (childSnapshot, prevChildKey) {
        console.log(childSnapshot.val());

        var trainNameDisplayed = childSnapshot.val().name;
        var trainDestinationDisplayed = childSnapshot.val().destination;
        var trainTimeDisplayed = childSnapshot.val().trainTime;
        var trainFrequencyDisplayed = childSnapshot.val().frequency;


        var trainTimeArray = trainTimeDisplayed.split(':');
        var time = moment()
        .hours(trainTimeArray[0])
        .minutes(trainTimeArray[1]);
        
        var maximum = moment()
        .max(moment(), time);


        var trainMins;
        var trainArrival;
        if (maximum === time) {
            trainArrival = time.format("hh:mm");
            trainMins = time.diff(moment(), "minutes");
        } else {
            var timeDifferance = moment().diff(time, "minutes");
            var timeRemainder = timeDifferance % trainFrequencyDisplayed;
            trainMins = trainFrequencyDisplayed - timeRemainder;

            trainArrival = moment().add(trainMins, "m").format("hh:mm")
        }

        //add new trains into the table 
        $('#trainTable  > tbody').append(
            $('<tr>').append(
                $('<td>').text(trainNameDisplayed),
                $('<td>').text(trainDestinationDisplayed),
                $('<td>').text(trainFrequencyDisplayed),
                $('<td>').text(trainArrival),
                $('<td>').text(trainMins),
            )
        )
  })} ); 