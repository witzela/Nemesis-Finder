/* This file contains clientside javascript */

//used to regulate multiple button clicks
var currentlySearching = false;
var searchingDots = 0;
var searchingAnimation;

$(document).ready(function() {


	// called when someone hits Go! or enter to search a summoner
	$('#searchForm').submit(function() {
		if(currentlySearching) {
			return false;
		}

		var searchName = $('.searchBox').val();

		console.log("Search for : " + searchName);
		currentlySearching = true;

		// sets the Searching... animation running
		searchingAnimation = setInterval(function() {
			var dotsToAdd = "";
			for(var i = 0; i < searchingDots; i++) {
				dotsToAdd += ".";
			}

			$('.searchDescription').text("Searching" + dotsToAdd);

			searchingDots++;
			if(searchingDots > 4) {
				searchingDots = 0;
			}
		}, 100);

		// does a get request to the server for a specified summoner
		$.get(
			"/data",
			{name : searchName},
			function(data) {
				currentlySearching = false;

				var messageToDisplay = data;

				// data has data from the server as a response to summoner name
				if(data == "error") {
					messageToDisplay = "Server Error.";
				}
				else if(data == "overload") {
					messageToDisplay = "Too amny summoners are refreshing. Please try again.";
				}
				// else {
				// 	console.log("Sucess! Data: \n" + data);
				// }

				clearInterval(searchingAnimation);
				searchingAnimation = null;
				$('.searchDescription').text(messageToDisplay);
			}
		);

		return false;
	});
});