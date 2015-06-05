window.BrowserAudioSink = (function() {
    return function(browserAudioDestination) {
        this.browserNode = function() {
            return browserAudioDestination;
        };

        this.disconnect = function() {
            try{
                this.browserNode().disconnect();
            } catch (e){
                console.log("tried to disconnect an something that wasn't connected");
            }
        }
    };
})();
