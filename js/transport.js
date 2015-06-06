window.Transport = (function(){
    return function(){
        this.playing = false;
        var that = this;
        this.togglePlayPause = function(){
            this.playing ? stripCollection.pauseAll() : stripCollection.unpauseAll();
            this.playing = !this.playing;
        }

        this.pause = function() {
            console.log("pausing");
            this.playing = false;
            stripCollection.pauseAll();
        }

        this.play = function() {
            console.log("playing");
            this.playing = true;
            stripCollection.unpauseAll();
        };

        this.audioTime = function() {
            return $("audio")[0].currentTime;
        };

        this.duration = function() {
            return $("audio")[0].duration;
        }

        this.setAudioTime = function(time) {
            var audios = $("audio");
            console.log(time);
            for (var i = 0; i < audios.length; i++) {
                var audio = audios[i];
                audio.currentTime = time;
            }
        }

        this.reset = function() {
            stripCollection.pauseAll();
            that.playing = false;
            that.setAudioTime(0);
        }
    }
}());
