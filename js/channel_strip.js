window.ChannelStrip = (function() {
    return function() {
        var source = null;
        this.setSource = function(newSource) {
            source = newSource;
        }

        this.runChain = function(sink) {
            establishConnections(sink);
            source.start();
        };

        function establishConnections(sink) {
            var node = source;
            node.connect(sink);
        }
    };
}());
