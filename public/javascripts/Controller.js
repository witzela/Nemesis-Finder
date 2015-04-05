/* This file contains clientside javascript */

//used to regulate multiple button clicks
var currentlySearching = false;

$(document).ready(function() {
	$('#searchForm').submit(function() {
		if(currentlySearching) {
			return false;
		}

		var searchName = $('.searchBox').val();

		console.log("Search for : " + searchName);
		currentlySearching = true;

		$.get(
			"/data",
			{name : searchName},
			function(data) {
				currentlySearching = false;

				// data has data from the server as a response to summoner name
				if(data == "error") {
					console.log("Error.");
				}
				else if(data == "overload") {
					console.log("Overload of requests");
				}
				else {
					console.log("Sucess! Data: \n" + data);
				}
			}
		);

		return false;
	});
});