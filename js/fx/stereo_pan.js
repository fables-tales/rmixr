window.stereoPan = function(source, sink, pan) {
    var panNode = window.audioContext.createStereoPanner();
    source.connect(panNode);
    panNode.connect(sink);

    panNode.pan.value = pan;
}