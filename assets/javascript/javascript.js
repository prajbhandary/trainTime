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
function test() {
    $("#values").empty() //question
database.on("child_added",function(snapshot){


var currentTime = moment(moment(),'dd:hh:mm:ss a') // question
var firstTrain  = moment(snapshot.val().firstTrain,'dd:hh:mm:ss a')

// if (currentTime < firstTrain){
//     firstTrain = moment().add(1,'day');
// }

var frequency = snapshot.val().frequency;
var totalMinutes = currentTime.diff(firstTrain,"minutes")

console.log("firstTrain :" + moment(firstTrain).format('hh:mm a'))
console.log("totalminutes :" + totalMinutes)
var mod = (totalMinutes % frequency)
if (mod < 0){
    mod = mod * (-1)
}
console.log("mod : " + mod)
var addMinutes = frequency - mod
console.log("addMinutes : " + addMinutes)
var nextTrain = moment().add(addMinutes,'minutes').format('hh:mm a');
console.log(nextTrain)

   $("#values").append(("<tr> " +
   " <td> " + snapshot.val().trainName +" </td> "+
   " <td> " + snapshot.val().destination +" </td> "+
   " <td> " + frequency +" </td> "+
   " <td> " + nextTrain +" </td> "+
   " <td> " + addMinutes + "</td> "));

})
}


  
  function startTime() {
    var today = new moment().format('h:mm:ss a')
   // document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    $("#time").text('Current Time : ' + today)
    t = setTimeout(function() {
      startTime()
      test()
    }, 1000);
  }
  startTime();
  test()