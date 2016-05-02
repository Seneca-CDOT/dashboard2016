var currentIssue; // used for for the routines to parse the issues
var issues = []; // Contains all the issues read from github

var gitHubData = (function () {
	var httpRequest = new XMLHttpRequest();
	var url = 'https://api.github.com/repos/Seneca-CDOT/dashboard2016/issues';
	var data;

	httpRequest.onreadystatechange = function() {
	    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
	        data = JSON.parse(httpRequest.responseText);
	    }
	};

	httpRequest.open("GET", url, false);
	httpRequest.send();

	return data;
})();

// Class Issue
var Issue = function(init) {
	var that = {};

	var _title = init.title || null;
	var _issueNumber = init.issueNumber || null;
	var _isOpen = init.isOpen === 'open' || false;
	var _assignee = (init.assignee) ? init.assignee.login : null;
	var _date = init.date || null;
	var _milestone = (init.milestone) ? init.milestone.title : null;

	that.title = function() {
		return _title;
	}

	that.issueNumber = function() {
		return _issueNumber;
	}

	that.isOpen = function() {
		return _isOpen;
	}

	that.assignee = function() {
		return _assignee;
	}

	that.date = function() {
		return _date;
	}

	that.milestone = function() {
		return _milestone;
	}

	return that;
};

// Parsing the issues and populating the array of issues
for (i = 0; i < gitHubData.length; i++) {
	currentIssue = gitHubData[i];
	issues.push(Issue({
		title: currentIssue.title,
		issueNumber: currentIssue.number,
		isOpen: currentIssue.state,
		assignee: currentIssue.assignee,
		date: currentIssue.created_at,
		milestone: currentIssue.milestone
	}));
}

/*
+ issueNumber
+ isOpen : boolean
- assignee
- date
- milestone

*/


/*
var data = [{
	name_: "name1",
	issues_: [{
		isOpen_: true,
		issueNumber_: 0,
		assignee_: "name2",
		date_: "14/14/14",

		isOpen: function() {
			return this.isOpen;
		},

	}],

	name: function() {
		return this.name;
	},
	numOpen: function() {
		//...
	},
	numClosed: function() {
		//...
	},
	addIssue: function(issue) {
		//...
	},
	removeIssue: function(issueNumber) {
		//...
	}
}];
*/
/*
var data = [{
	name: function() {
		return 'Person 1';
	},
	numOpen: function() {
		return 1;
	},
	numClosed: function() {
		return 2;
	},
	addIssue: function(issue) {
		console.log('inserting ' + issue);
	},
	removeIssue: function(issueNumber) {
		console.log('removing ' + issueNumber);
	}
}, {
	name: function() {
		return 'Person 2';
	},
	numOpen: function() {
		return 2;
	},
	numClosed: function() {
		return 4;
	},
	addIssue: function(issue) {
		console.log('inserting ' + issue);
	},
	removeIssue: function(issueNumber) {
		console.log('removing ' + issueNumber);
	}
}, {
	name: function() {
		return 'Person 3';
	},
	numOpen: function() {
		return 5;
	},
	numClosed: function() {
		return 5;
	},
	addIssue: function(issue) {
		console.log('inserting ' + issue);
	},
	removeIssue: function(issueNumber) {
		console.log('removing ' + issueNumber);
	}
}];
*/