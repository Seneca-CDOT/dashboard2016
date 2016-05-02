function setup() {
	createCanvas(640, 480);
	var open = 0;
	var closed = 0;

	for (var i = 0; i < persons.length; i++) {
		var name = persons[i].name() || "Unassigned";
		drawBar(persons[i].numClosed(), persons[i].numTotal(), name);
		open += persons[i].numOpen();
		closed += persons[i].numClosed();
	}

	var total = open + closed;

	alert('Total: ' + total + '; Open: ' + open + '; Closed: ' + closed);
}

function draw() {

}