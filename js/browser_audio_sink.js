window.BrowserAudioSink = (function() {
    return function(browserAudioDestination) {
        this.browserNode = function() {
            return browserAudioDestination;
        };

        this.disconnect = function() {
            this.browserNode().disconnect();
        }
    };
})();
