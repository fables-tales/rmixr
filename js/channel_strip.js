window.ChannelStrip = (function() {
    return function(loopCallBack) {
        var source = null;
        var sink = null;
        var effects = [];
        var loopPoints = [];

        var effectsFactory = new EffectsFactory(window.audioContext);
        var scriptNode = window.audioContext.createScriptProcessor(4096, 1, 1);

        var rmsValues = [];

        var bufSize = 1;

        var gain = 1;


        var currentLoopPoint = null;


        scriptNode.onaudioprocess = function(audioProcessingEvent) {
            // The input buffer is the song we loaded earlier
            var inputBuffer = audioProcessingEvent.inputBuffer;

            if (currentLoopPoint == null && loopPoints.length >= 3) {
                currentLoopPoint = [loopPoints[0], loopPoints[1], loopPoints[2]];
                source.setCurrentTime(currentLoopPoint[0]);
                loopPoints.shift();
                loopPoints.shift();
                loopPoints.shift();
                loopCallBack(loopPoints);
            } else if (currentLoopPoint != null) {
                var ct = source.currentTime();
                if (ct >= currentLoopPoint[1] && ct <= currentLoopPoint[1] + currentLoopPoint[2]) {
                    gain = 0;
                    console.log("muting");
                    console.log(currentLoopPoint);
                } else if (ct >= currentLoopPoint[1] + currentLoopPoint[2]) {
                    console.log(currentLoopPoint);
                    console.log("done");
                    currentLoopPoint = null;
                    gain = 1;
                    window.removeNode();
                }
            }

            // The output buffer contains the samples that will be modified and played
            var outputBuffer = audioProcessingEvent.outputBuffer;

            // Loop through the output channels (in this case there is only one)
            for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
                var inputData = inputBuffer.getChannelData(channel);
                var outputData = outputBuffer.getChannelData(channel);

                var rms = 0;

                // Loop through the 4096 samples
                for (var sample = 0; sample < inputBuffer.length; sample++) {
                    rms += inputData[sample] * inputData[sample];
                    outputData[sample] = gain * inputData[sample];
                }

                rms = rms/inputBuffer.length;
                rms = Math.sqrt(rms);

                rmsValues.push(rms);
                if (rmsValues.length > bufSize) {
                    rmsValues.shift();
                }
            }
        }

        this.getAmplitude = function() {
            if (rmsValues.length < bufSize) {
                return 0;
            }
            var sum = 0;
            for (var i = 0; i < rmsValues.length; i++) {
                sum += rmsValues[i];
            }

            return sum/rmsValues.length;
        }

        this.setSource = function(newSource) {
            source = newSource;
        }

        this.runChain = function(newSink) {
            sink = newSink;
            source.browserNode().connect(scriptNode);
            scriptNode.connect(sink.browserNode());
        };

        this.pause = function() {
            source.pause();
        }

        this.unpause = function(){
            source.unpause();
        }

        this.updateState = function(newChannelState) {
            replaceEffects(newChannelState.effects);
            loopPoints = newChannelState.loopPoints;
            newChannelState.notmuted?this.mute():this.unmute();
        };

        this.mute = function(){
            gain = 0;
        }

        this.unmute = function(){
            gain = 1;
        }

        function disconnectAllEffects() {
            source.disconnect();
            scriptNode.disconnect();
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

            nextSource.connect(scriptNode);
            scriptNode.connect(sink.browserNode());
        }

        var tgain = 1;

        function establishConnections() {
        }
    };
}());
