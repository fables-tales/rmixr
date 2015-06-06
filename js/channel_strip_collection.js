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
                $("body").append('<audio src="' + samples[i] + '" id="'+ id + '" preload="true">');
                tags.push($("#" + id)[0]);
            }
        }

        function buildAudioNodesForTags() {
            var build = [];
            for (var i = 0; i < tags.length; i++) {
                var mesn = window.audioContext.createMediaElementSource(tags[i]);
                mesn.mediaElement = tags[i];
                build.push(mesn);
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

        this.updateState = function(newState) {
            for (var i = 0; i < newState.channels.length; i++) {
                var newChannelState = newState.channels[i];
                channelStrips[i].updateState(newChannelState);
            }
        };

        this.pauseAll = function(){
            for(var i = 0; i < channelStrips.length; i++){
                channelStrips[i].pause();
            }
        };

        this.unpauseAll = function(){
            for(var i = 0; i < channelStrips.length; i++){
                channelStrips[i].unpause();
            }
        };

        this.getAmplitude = function(channel) {
            return channelStrips[channel].getAmplitude();
        }

        function makeChannelStrip(build, audiosources, i) {
            var cs = new ChannelStrip(function(newLoopPoints) {
                var state = window.parseHash();
                state.channels[i].loopPoints = newLoopPoints;
                window.location.hash = JSON.stringify(state);
            });
            cs.setSource(new BrowserAudioSourceNodeWrapper(audioSources[i]));
            build.push(cs);
        }

        function makeChannelStripsFromSources(audioSources) {
            var build = [];
            for (var i = 0; i < audioSources.length; i++) {
                makeChannelStrip(build, audioSources, i);
            }

            return build;
        };

    };
}());

window.ChannelStripCollection.factory = function(samples) {
    var sources = new SampleCreator(samples).call();
    return new ChannelStripCollection(sources);
};
