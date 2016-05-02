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

//Class Person
var Person = function(name) {
	var that = {};
	var name_ = name;
	var issues_ = [];

	that.name = function() {
		return name_;
	}

	that.numOpen = function() {
		var num = 0;
		for (var i=0;i<issues_.length;i++) {
			if (issues_[i].isOpen()) {
				num++;
			}
		}
		return num;
	}

	that.numClosed = function() {
		var num = 0;
		for (var i=0;i<issues_.length;i++) {
			if (!issues_[i].isOpen()) {
				num++;
			}
		}
		return num;
	}

	that.numTotal = function() {
		return issues_.length;
	}

	that.addIssue = function(issue) {
		issues_.push(issue);
	}

	that.removeIssue = function(number) {
		var found = false;
		for (var i=0;i<issues_.length && found == false;i++) {
			if (issues_[i].issueNumber() == number) {
				found = true;
				issues_.splice(i, i+1);
			}
		}
	}
	return that;
};

var drawBar = (function () {
	topMargin = 10;
	var incrementTopMargin = function () {
		topMargin += 60;
	};

	return function (left, total, label) {
		var leftMargin = 10;
		var defaultWidth = 400;
		var heightSpace = 20;
		var filledWidth = (left / total) * defaultWidth;

		fill(color(0, 0, 0));
		textSize(20);
		text(label, leftMargin, topMargin + 10);

		fill(color(0, 150, 0));
		rect(leftMargin, topMargin + heightSpace, 400, 20);

		fill(color(200, 0, 0));
		rect(leftMargin, topMargin + heightSpace, filledWidth, 20);

		incrementTopMargin();
	};
}());

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
