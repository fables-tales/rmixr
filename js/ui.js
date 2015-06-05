window.DawUI = (function() {
    window.parseHash = function() {
        var hash = window.location.hash;
        var state = JSON.parse(hash.substring(1));
        return state;
    }
    return function() {
        this.call = function() {
            $(document).ready(function() {
                initUI();
            });
        }

        function initUI() {
            renderState(parseHash());
        };

        function renderState(state) {
            var channels = state.channels;
            for (var i = 0; i < channels.length; i++) {
                var channelLink = makeChannelLink(i, channels[i]);
                $("#list").append(channelLink);
            }
        }

        function makeChannelLink(index, channel) {
            var linkElement = $(inflateTemplate("channel", {"title": "Channel " + index}));

            linkElement.click(function() {
                $(".email-item-selected").each(function(i,e) {
                    console.log(e);
                    $(e).removeClass("email-item-selected");
                });
                $(this).addClass("email-item-selected");
                showChannelStripSettings(index);
            });
            return linkElement;
        }

        function showChannelStripSettings(i) {
            var state = parseHash();
            var channelState = state.channels[i];
            $("#effects-menu-list").empty();
            $("#effects-menu-list").append("<li class='pure-menu-item'><span class='pure-menu-link'>New effect</span></li>");
        };

        function inflateTemplate(template, params) {
            var templateSource = $("#template-" + template).html();
            return Mustache.render(templateSource, params);
        }
    };
}());
