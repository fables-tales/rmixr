window.chorus = function(source, sink, rate, feedback, delay) {
    var chorus = new tuna.Chorus({
                     rate: rate,         //0.01 to 8+
                     feedback: feedback,     //0 to 1+
                     delay: delay,     //0 to 1
                     bypass: 0          //the value 1 starts the effect as bypassed, 0 or 1
                 });
    source.connect(chorus.input);
    chorus.connect(sink);
}
