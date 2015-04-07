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
			var spacesToAdd = "";
			for(var i = 0; i < searchingDots; i++) {
				spacesToAdd += " ";
				dotsToAdd += ".";
			}

			$('.searchDescription').text(spacesToAdd + "Searching" + dotsToAdd);

			searchingDots++;
			if(searchingDots > 4) {
				searchingDots = 0;
			}
		}, 250);

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
				else if(data == "not found") {
					messageToDisplay = "Summoner not found.";
				}
				else if(data == "overload") {
					messageToDisplay = "Too many summoners are refreshing. Please try again.";
				}
				else {
					$('.searchBox').val("");
					// console.log("Sucess! Data: \n" + data);
				}

				clearInterval(searchingAnimation);
				searchingAnimation = null;
				$('.searchDescription').text(messageToDisplay);
			}
		);

		return false;
	});
});