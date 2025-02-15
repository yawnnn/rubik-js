class Animation {
    constructor(max_frames, callback) {
        this.frames_left = max_frames;
        this.callback = callback;
    }

    in_progress() {
        return this.frames_left > 0;
    }

    step() {
        if (this.frames_left > 0) {
            this.callback();
            this.frames_left--;
        }
    }
}