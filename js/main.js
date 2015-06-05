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
        "source_audio/derezzed_bass.mp3",
        "source_audio/derezzed_layer_1.mp3",
        "source_audio/derezzed_layer_2.mp3",
    ];

    if (window.location.hash == "") {
        var json = {"channels": []};
        for (var i = 0; i < samples.length; i++) {
            json.channels.push({effects: []});
        }

        window.location.hash = JSON.stringify(json);
        oldHash = window.location.hash;
    }


    window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    window.stripCollection = ChannelStripCollection.factory(samples);
    stripCollection.startAll(new BrowserAudioSink(audioContext.destination));

    setInterval(function() {
        respondToHashChange();
    },100);

    new DawUI().call();
})();
