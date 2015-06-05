window.Transport = (function(){
        return function(){
                this.currentTime = 0;
                this.playing = false;
                var that = this;
                this.togglePlayPause = function(){
                        this.playing?stripCollection.pauseAll():stripCollection.unpauseAll();
                        this.playing = !this.playing;
                }
        }
}());
