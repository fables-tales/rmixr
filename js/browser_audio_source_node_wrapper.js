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
						console.log(that.browserNode());
            that.browserNode().mediaElement!=undefined?that.browserNode().mediaElement.play():that.browserNode().play();
        }
    }
}());
