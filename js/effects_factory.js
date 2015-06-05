window.EffectsFactory = (function() {
    return function(audioContext) {

        var knownEffects = {};
        knownEffects.gain = function(params) {
            var gain = audioContext.createGain();
            gain.gain.value = params.gain;
            return gain;
        };

        this.call = function(effectState) {
            var effectFactory = knownEffects[effectState.name];
            var effect = effectFactory(effectState.params);
            console.log("dropping");
            return new BrowserEffectNodeWrapper(effect);
        };
    };
}());
