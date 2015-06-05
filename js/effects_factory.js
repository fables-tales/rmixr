window.EffectsFactory = (function() {
    return function(audioContext) {

        var knownEffects = {};
        knownEffects.gain = function(source, sink, params) {
            var gain = audioContext.createGain();
            gain.gain.value = params.gain;
            source.connect(gain);
            gain.connect(sink);
        };

        knownEffects.threebandEQ = function(source, sink, params) {
            threebandEQ(source, sink, params.bassgain, params.midgain, params.treblegain);
        };

        this.call = function(source, sink, effectState) {
            var effectFactory = knownEffects[effectState.name];
            effectFactory(source, sink, effectState.params);
        };
    };
}());
