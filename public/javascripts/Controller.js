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

				var messageToDisplay = "Error!!!";

				// data has data from the server as a response to summoner name
				if(data == "error") {
					messageToDisplay = "Server error.";
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
					messageToDisplay = "Success! Please choose a match:";
					
					parseMatchData(JSON.parse(data));
				}

				clearInterval(searchingAnimation);
				searchingAnimation = null;

				// sets the text of the description to the response
				$('.searchDescription').text(messageToDisplay);
			}
		);

		return false;
	});
});

var parseMatchData = function (matchData) {
	var parsedData = "";

	// make the variable matchArray contain the array of Matches
	for(matchArray in matchData) {
		// console.log("Data: " + matchArray);
		// console.log("\n\nData 2: " + matchData[matchArray]);
		break;
	}

	for(var i = 0; i < matchData[matchArray].length; i++) {
		// queueType
		parsedData += "Match " + i + ": " + matchData[matchArray][i].queueType + "    |    \n";// matchData[matchArray]

		// parsedData += JSON.stringify(matchData[matchArray][0]);

		// break;
	}

	// parsedData += matchArray[0];

	$('.resultText').text(parsedData);
}