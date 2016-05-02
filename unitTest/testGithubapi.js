for (i = 0; i < issues.length; i++) {
	currentIssue = issues[i];
	console.log(
		'title: ' + currentIssue.title() + '; ' +
		'issueNumber: ' + currentIssue.issueNumber() + '; ' +
		'isOpen: ' + currentIssue.isOpen() + '; ' +
		'assignee: ' + currentIssue.assignee() + '; ' +
		'date: ' + currentIssue.date() + '; ' +
		'milestone: ' + currentIssue.milestone() + '; '
	);
}