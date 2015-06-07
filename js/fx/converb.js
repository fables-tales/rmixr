window.converb = function(source, sink, dry, wet) {
    var convolver = new tuna.Convolver({
                        highCut: 22050,                         //20 to 22050
                        lowCut: 20,                             //20 to 22050
                        dryLevel: dry,                            //0 to 1+
                        wetLevel: wet,                            //0 to 1+
                        level: 1,                               //0 to 1+, adjusts total output of both wet and dry
                        impulse: "js/tuna/impulses/impulse_rev.wav",    //the path to your impulse response
                        bypass: 0
                    });
    source.connect(convolver.input);
    convolver.connect(sink);
}