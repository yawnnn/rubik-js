function Animation() {
	this.frames_left = 0;

	this.animate = function(axis, dir, frames_left) {
		this.tomove = [];
	    this.axis = axis;
	    this.dir = dir;
	    this.frames_left = frames_left;
	}
}