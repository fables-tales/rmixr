(function() {
    var samples = [
        "source_audio/derezzed_bass.mp3",
        "source_audio/derezzed_layer_1.mp3",
        "source_audio/derezzed_layer_2.mp3",
    ];


    window.audioContext = new (window.AudioContext || window.webkitAudioContext)();

    var stripCollection = ChannelStripCollection.factory(samples);
    stripCollection.startAll(new BrowserAudioSink(audioContext.destination));

    var tgain = 0;

    setInterval(function() {
        console.log("XB");
        tgain = 1-tgain;
        var effects = [
            {"name": "gain", "params": {"gain": tgain == 0 ? 0.2 : tgain}}
        ];
        stripCollection.updateState({
            channels: [{effects: effects}, {effects: effects}, {effects: effects}]
        })
    }, 1500);
})();
