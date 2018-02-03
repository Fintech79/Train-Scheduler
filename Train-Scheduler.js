

var config = {
    apiKey: "AIzaSyBMcR8b0krptpgRWDDZ4Ar1SzEVhKr1SWA",
    authDomain: "bullet-train-60d7b.firebaseapp.com",
    databaseURL: "https://bullet-train-60d7b.firebaseio.com",
    projectId: "bullet-train-60d7b",
    storageBucket: "bullet-train-60d7b.appspot.com",
    messagingSenderId: "789301192784"
  };
 firebase.initializeApp(config);


    var database = firebase.database();

var trainLine;
var destination;
var frequency;
var nextArrival;
var minutesAway;

$('#submit-btn').on('click', function(event) {
	event.preventDefault();

	trainLine = $('#line-input').val().trim();
	destination = $('#destination-input').val().trim();
	frequency = $('#frequency-input').val().trim();
	nextArrival = $('#nextArrival-input').val().trim();
    minutesAway = $('#minutesAway-input').val().trim();
	database.ref().push({
		trainLine: trainLine,
		destination: destination,
		frequency: frequency,
		nextArrival: nextArrival,
		minutesAway: minutesAway
	});

	$('#line-input').empty();
	$('#destination-input').empty();
	$('#frequency-input').empty();
	$('#nextArrival-input').empty();
	$('#minutesAway-input').empty();
});

database.ref().on("child_added", function(snapshot) {
	console.log(snapshot.val());

	var currentTime =  moment().format();
	var minutesAway =  snapshot.val().minutesAway;
	var nextArrival = currentTime + minutesAway; // TODO look up in moment library how to add to current time
	


	$('#table-body').append(
		'<tr>' +
			'<td>' + snapshot.val().trainline + '</td>' +
			'<td>' + snapshot.val().destination + '</td>' +
			'<td>' + snapshot.val().frequency + '</td>' +
			'<td>' + snapshot.val().nextArrival + '</td'> +
			'<td>' + snapshot.val().currentTime + '</td>' +
			'<td>' + snapshot.val().minutesAway + '</td>' +
	         //firebase timestamp  
        '</tr>'
	           );
});