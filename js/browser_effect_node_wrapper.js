window.BrowserEffectNodeWrapper = (function() {
    return function(browserEffectNode) {
        this.setInputNode = function(node) {
            node.connect(browserEffectNode);
        }

        this.connectToOutputNode = function(node) {
            browserEffectNode.connect(node);
        };

        this.disconnect = function() {
            this.browserNode().disconnect();
        }
    }
}());
