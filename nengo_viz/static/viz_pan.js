/* Calculates drag deltas on background */

VIZ.pan = {};

VIZ.pan.enabled = false;

/*A Posn is an object with:
 posn.x - int 
 posn.y - int
*/

//Used for storing the cumulative x and y panning of the model
VIZ.pan.cposn = {x:0, y:0};

function init_main_events() {
	console.log($('.netgraph'));
	$(".netgraph")
		.mousedown(function(event) { //Listens for mousedown
			if (event.target == $('.netgraph')[0]) { //Checks that you have indeed clicked the #main element
				VIZ.pan.enabled = true; //Enables panning
			}
			VIZ.pan.iposn = {x:event.pageX, y:event.pageY}; //Gets the starting point of your mouse
										 //Used for storing the initial x and y points of the mouse when panning
		})
		.mousemove(function(event) {// Listens for mouse movement
			if (VIZ.pan.enabled) { // Checks if panning is allowed
			    var deltaX = event.pageX - VIZ.pan.iposn.x; // Calculates differences using initial x and y reference points
			    var deltaY = event.pageY - VIZ.pan.iposn.y;
			    VIZ.pan.iposn.x = event.pageX; // Updates initial reference points
			    VIZ.pan.iposn.y = event.pageY;
			    VIZ.pan.shift(deltaX, deltaY); // Call the pan function with the differences that should be made
			}
		})
		.mouseup(function() {// Listens for mouseup
		    VIZ.pan.enabled = false;//Disables panning
		});
	}

/*Pass this function the amount of change you want to apply to the screen*/
VIZ.pan.shift = function(dx,dy) {
	VIZ.pan.cposn.x += dx;
	VIZ.pan.cposn.y += dy;
	$('.graph').each(function(i, element){ // Get all the graph elements
		var cords = VIZ.get_transform(element);
		VIZ.set_transform(element, cords.x + dx, cords.y + dy); // Do the transformation
	});
};

/*snap_to pans the screen to the specified posn cords quickly. 
Effectively the same as changing the cposn cords to the posn points, and panning the screen accordingly*/
VIZ.pan.snap_to = function(posn) {
	var dx = posn.x - VIZ.pan.cposn.x;
	var dy = posn.y - VIZ.pan.cposn.y;
	VIZ.pan.shift(dx,dy);
}

//Get those main event listeners up and running
setTimeout(function(){init_main_events();},100);
