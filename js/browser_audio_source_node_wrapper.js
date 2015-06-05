window.BrowserAudioSourceNodeWrapper = (function() {
    return function(audioSource) {
        this.browserNode = function() {
            return audioSource;
        }

        this.connect = function(other) {
            audioSource.connect(other.browserNode());
        }

        this.start = function() {
            audioSource.mediaElement.play();
        }
    }
}());
