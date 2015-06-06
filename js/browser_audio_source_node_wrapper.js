window.BrowserAudioSourceNodeWrapper = (function() {
    return function(audioSource) {
        var that = this;
        this.browserNode = function() {
            return audioSource;
        }

        this.connect = function(other) {
            that.browserNode().connect(other.browserNode());
        }

        this.disconnect = function() {
            that.browserNode().disconnect();
        }

        this.start = function() {
            that.browserNode().mediaElement.play();
        }

        this.duration = function() {
            return that.browserNode().mediaElement.duration;
        }

        this.setCurrentTime = function(time) {
            that.browserNode().mediaElement.currentTime = time;
        }

        this.currentTime = function() {
            return that.browserNode().mediaElement.currentTime;
        }

        this.mute = function() {
            return that.browserNode().mediaElement.volume = 0;
        }

        this.unmute = function() {
            return that.browserNode().mediaElement.volume = 1.0;
        }

				this.pause = function(){
						that.browserNode().mediaElement.pause();
				}

				this.unpause = function(){
						that.browserNode().mediaElement.play();
				}
    }
}());
