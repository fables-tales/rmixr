window.BrowserEffectNodeWrapper = (function() {
    return function(browserEffectNode) {
        this.browserNode = function() {
            return browserEffectNode;
        }

        this.connect = function(node) {
            this.browserNode().connect(node.browserNode());
        };

        this.disconnect = function() {
            this.browserNode().disconnect();
        }
    }
}());
