var config = {
    apiKey: "AIzaSyAg4xO-AR-FiS7_4VoWZRDZEkdayf9u3gA",
    authDomain: "train-d3699.firebaseapp.com",
    databaseURL: "https://train-d3699.firebaseio.com",
    projectId: "train-d3699",
    storageBucket: "train-d3699.appspot.com",
    messagingSenderId: "791672442530"
  };
  firebase.initializeApp(config);


var database = firebase.database().ref();
//1. On click function
$("#add").on("click",function(event){
    var trainName = $("#trainName").val()
    var destination = $("#destination").val()
    var firstTrain = $("#firstTrain").val()
    var frequency = $("#frequency").val()
    writeUserData(trainName,destination,firstTrain,frequency)

})

//2. Write to firebase 
/* 
        Train Name 
        Destination
        First Train
        Frequency  
*/


function writeUserData(trainName,destination,firstTrain,frequency){
    database.push({
    trainName : trainName,
    destination: destination,
    firstTrain : firstTrain,
    frequency: frequency,
    })
}





//3. Read from database and Display


database.on("child_added",function(snapshot){


   console.log(snapshot.val().trainName);
   console.log(snapshot.val().destination);
   console.log(snapshot.val().firstTrain);
   console.log(snapshot.val().frequency);

   $("#values").append(("<tr> " +
   " <td> " + snapshot.val().trainName +" </td> "+
   " <td> " + snapshot.val().destination +" </td> "+
   " <td> " + snapshot.val().frequency +" </td> "+
   " <td> " + "NAN" +" </td> "+
   " <td> " + "NAN" + "</td> "));



})









//4. Function to calcuate Next Arrival & Minutes away


// next arrival 




///

function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function() {
      startTime()
    }, 500);
  }
  startTime();