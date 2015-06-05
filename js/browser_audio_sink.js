window.BrowserAudioSink = (function() {
    return function(browserAudioDestination) {
        this.browserNode = function() {
            return browserAudioDestination;
        };
    };
})();
