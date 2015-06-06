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

        knownEffects.stereoPan = function(source, sink, params) {
            stereoPan(source, sink, params.pan);
        };

        knownEffects.converb = function(source, sink, params) {
            converb(source, sink, params.dry, params.wet);
        };

        this.call = function(source, sink, effectState) {
            var effectFactory = knownEffects[effectState.name];
            effectFactory(source, sink, effectState.params);
        };
    };
}());
