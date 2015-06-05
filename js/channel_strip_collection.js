window.SampleCreator = (function() {
    return function(samples) {
        var tags = [];
        console.log(samples);
        this.call = function() {
            createAudioTags();
            return buildAudioNodesForTags();
        };

        function createAudioTags() {
            for (var i = 0; i < samples.length; i++) {
                var id = "sample-" + i;
                $("body").append('<audio src="' + samples[i] + '" id="'+ id + '">');
                tags.push($("#" + id)[0]);
            }
        }

        function buildAudioNodesForTags() {
            var build = [];
            for (var i = 0; i < tags.length; i++) {
                build.push(window.audioContext.createMediaElementSource(tags[i]));
            }
            console.log(build);

            return build;
        };
    }
}());

window.ChannelStripCollection = (function() {
    return function(audioSources) {
        var channelStrips = makeChannelStripsFromSources(audioSources);

        this.startAll = function(sink) {
            for (var i = 0; i < channelStrips.length; i++) {
                channelStrips[i].runChain(sink);
            }
        };

        function makeChannelStripsFromSources(audioSources) {
            var build = [];
            for (var i = 0; i < audioSources.length; i++) {
                var cs = new ChannelStrip();
                cs.setSource(new BrowserAudioSourceNodeWrapper(audioSources[i]));
                build.push(cs);
            }

            return build;
        };
    };
}());

window.ChannelStripCollection.factory = function(samples) {
    var sources = new SampleCreator(samples).call();
    return new ChannelStripCollection(sources);
};
