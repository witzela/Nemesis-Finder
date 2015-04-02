/* This javascript regulates and limits requests made to the Riot API */

var APIManager = module.exports = {
	// contains requests to the API made recently, used to control limits
	// each varaible is the time it was sent
	var recentRequests = []
}

// Gets the environemental variable which holds your API key (this is on github so I don't want to post mine)
APIManager.API_Key = process.env.riotAPIKey;

APIManager.APILimitPerTenMinutes = 499;
APIManager.APILimitPerTenSeconds = 9;

// used to check if a user can make a request to the API (they aren't over the limit)
// returns true if allowed
APIManager.checkAllowedRequest = function() {
	// First just purge old requests (> 10 minutes)
	for(var i = this.recentRequests.length - 1; i >= 0; i++) {
		if(Date.now() - this.recentRequests[i] > 1000 * 60 * 10) {
			// remove the element > 10 minutes old
			this.recentRequests.splice(i, 1);
		}
		else {
			// stop checking if the time isn't over 10 minutes
			break;
		}
	}

	var requestsInLast10Seconds = 0;
	var requestsInLast10Minutes = this.recentRequests.length;

	// computes requests done in last 10 seconds
	for(var i = 0; i < this.recentRequests.length; i++) {
		if(Date.now() - this.recentRequests[i] < 11) {
			requestsInLast10Seconds++;
		}
		else {
			// stop checking if the time is over 10 seconds
			break;
		}
	}

	// Checks if the user is over the API limit (should we allow or not)
	if(requestsInLast10Minutes < this.APILimitPerTenMinutes && requestsInLast10Seconds < this.APILimitPerTenSeconds) {
		recentRequests.unshift(Date.now());

		return true;
	}

	return false;
}