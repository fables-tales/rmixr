window.ChannelStrip = (function() {
    return function() {
        var source = null;
        var sink = null;
        var effects = [];
        var effectsFactory = new EffectsFactory(window.audioContext);
        this.setSource = function(newSource) {
            source = newSource;
        }

        this.runChain = function(newSink) {
            sink = newSink;
            source.connect(sink);
            source.start();
        };

        this.updateState = function(newChannelState) {
            replaceEffects(newChannelState.effects);
        };

        function disconnectAllEffects() {
            source.disconnect();
            for (var i = 0; i < effects.length; i++) {
                effects[i].disconnect();
            }
            sink.disconnect();
        }

        function replaceEffects(effectState) {
            sink.disconnect();
            source.disconnect();
            var nextSource = source.browserNode();

            for (var i = 0; i < effectState.length; i++) {
                var nextSink = audioContext.createGain();
                nextSink.gain.value = 1.0;
                effectsFactory.call(nextSource, nextSink, effectState[i]);
                nextSource = nextSink;
            }

            nextSource.connect(sink.browserNode());
        }

        var tgain = 1;

        function establishConnections() {
        }
    };
}());
