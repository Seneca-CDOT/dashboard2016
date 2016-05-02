for (i = 0; i < issues.length; i++) {
	currentIssue = issues[i];
	console.log(
		'title: ' + currentIssue.title() + '; ' +
		'issueNumber: ' + currentIssue.number() + '; ' +
		'isOpen: ' + currentIssue.state() + '; ' +
		'assignee: ' + currentIssue.assignee() + '; ' +
		'date: ' + currentIssue.created_at() + '; ' +
		'milestone: ' + currentIssue.milestone() + '; '
	);
}