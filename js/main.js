(function() {

    var oldHash = "";

    function loadStateFromHash(hash) {
        var state = JSON.parse(hash.substring(1));
        stripCollection.updateState(state);
    }

    function respondToHashChange() {
        var hash = window.location.hash;
        if (hash != oldHash) {
            loadStateFromHash(hash);
            oldHash = hash;
        }

    };

    var samples = [
        "source_audio/Dont_Stop_Me_Now_drums.mp3",
        "source_audio/Dont_Stop_Me_Now_Bass.mp3",
        "source_audio/Dont_Stop_Me_Now_Guitar.mp3",
        "source_audio/Dont_Stop_Me_Now_Piano.mp3",
        "source_audio/Dont_Stop_Me_Now_Backing_Vocals.mp3",
        "source_audio/Dont_Stop_Me_Now_Lead_Vocals.mp3",
    ];

    if (window.location.hash == "") {
        var json = {"channels": []};
        for (var i = 0; i < samples.length; i++) {
            json.channels.push({effects: [], loopPoints: []});
        }

        window.location.hash = JSON.stringify(json);
        oldHash = window.location.hash;
    }


    window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    window.tuna = new Tuna(window.audioContext);
    window.stripCollection = ChannelStripCollection.factory(samples);
    stripCollection.startAll(new BrowserAudioSink(audioContext.destination));

    setInterval(function() {
        respondToHashChange();
    },100);

        window.transport = new window.Transport();
        transport.togglePlayPause();

        window.togglePlayPause = function() {
            window.transport.togglePlayPause();
            if (window.transport.playing) {
                $("#playPause").html("<i class='fa fa-pause'></i>");
            } else {
                $("#playPause").html("<i class='fa fa-play'></i>");
            }
        }

    document.addEventListener('keypress',function(deets){
        if(deets.charCode===32) window.togglePlayPause();
    });

    new DawUI().call();
})();
