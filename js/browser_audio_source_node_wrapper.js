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
    }
}());