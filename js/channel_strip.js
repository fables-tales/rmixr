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
            establishConnections();
            source.start();
        };

        this.updateState = function(newChannelState) {
            console.log(newChannelState);
            replaceEffects(newChannelState.effects);
            establishConnections();
        };

        function disconnectAllEffects() {
            source.disconnect();
            for (var i = 0; i < effects.length; i++) {
                effects[i].disconnect();
            }
            sink.disconnect();
        }

        function replaceEffects(effectState) {
            var newEffects = [];
            for (var i = 0; i < effectState.length; i++) {
                newEffects.push(effectsFactory.call(effectState[i]));
            }

            effects = newEffects;
        }

        var tgain = 1;

        function establishConnections() {
            var node = source;
            node.disconnect();
            sink.disconnect();
            console.warn(effects);
            for (var i = 0; i < effects.length; i++) {
                var newNode = effects[i];
                node.connect(newNode);
                node = newNode;
            }
            node.connect(sink);
        }
    };
}());
