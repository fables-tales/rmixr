(function() {
    var QueryString = function () {
        // This function is anonymous, is executed immediately and
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [ query_string[pair[0]], pair[1] ];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1]);
            }
        }
        return query_string;
    }();

    function sendLocalStorageItem(item) {
        window.localStorage.setItem("rmixr-message", JSON.stringify(item));
    }

    function sendAddGainNodeMessage(channel) {
        var nodeDetails = {
            effect: {"name": "gain", "params": {"gain": 1.0}},
            channel: channel
        };
        sendLocalStorageItem(nodeDetails);
    }

    function sendAddTBEQ(channel) {
        var nodeDetails = {
            effect: {"name": "threebandEQ", "params": {"midgain": 0.0, "bassgain": 0.0, "treblegain": 0.0}},
            channel: channel
        };
        sendLocalStorageItem(nodeDetails);
    }

    $(document).ready(function() {
        var channel = parseInt(QueryString.channel);
        $("#gain").click(function() {
            sendAddGainNodeMessage(channel);
            close();
        });

        $("#three-band-eq").click(function() {
            sendAddTBEQ(channel);
            close();
        });
    });
}());
