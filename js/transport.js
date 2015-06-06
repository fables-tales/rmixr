window.Transport = (function(){
    return function(){
        this.playing = false;
        var that = this;
        this.togglePlayPause = function(){
            this.playing ? stripCollection.pauseAll() : stripCollection.unpauseAll();
            this.playing = !this.playing;
        }

        this.audioTime = function() {
            return $("audio")[0].currentTime;
        };

        this.duration = function() {
            return $("audio")[0].duration;
        }

        this.reset = function() {
            stripCollection.pauseAll();
            that.playing = false;

            var audios = $("audio");
            for (var i = 0; i < audios.length; i++) {
                var audio = audios[i];
                audio.currentTime = 0;
            }
        }
    }
}());
