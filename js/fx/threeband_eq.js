window.threebandEQ = function(source, sink, bassgain, midgain, treblegain) {

    var bass =  window.audioContext.createBiquadFilter();
    var mid = window.audioContext.createBiquadFilter();
    var treble = window.audioContext.createBiquadFilter();

    source.connect(bass);
    bass.connect(mid);
    mid.connect(treble);
    treble.connect(sink);

    bass.type = "lowshelf";
    bass.frequency.value = 100;
    bass.gain.value = bassgain;
    mid.type = "peaking";
    mid.frequency.value = 1000;
    mid.Q.value = 1;
    mid.gain.value = midgain;
    treble.type = "highshelf";
    treble.frequency.value = 4000;
    treble.gain.value = treblegain;

};
