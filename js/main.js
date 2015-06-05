(function() {
    var samples = [
        "source_audio/derezzed_bass.mp3",
        "source_audio/derezzed_layer_1.mp3",
        "source_audio/derezzed_layer_2.mp3",
    ];


    window.audioContext = new (window.AudioContext || window.webkitAudioContext)();

    var stripCollection = ChannelStripCollection.factory(samples);
    stripCollection.startAll(new BrowserAudioSink(audioContext.destination));
})();
