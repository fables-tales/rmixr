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

                setInterval(function() {
                    var message = window.localStorage.getItem("rmixr-message");
                    if (message != "" && message != null) {
                        var parsedMessage = JSON.parse(message);
                        addEffect(parsedMessage);
                        window.localStorage.setItem("rmixr-message", "");
                    }

                    var effect_update = window.localStorage.getItem("update_effect");
                    if (effect_update != "" && effect_update != null) {
                        var parsedMessage = JSON.parse(effect_update);
                        updateEffect(parsedMessage);
                        window.localStorage.setItem("update_effect", "");
                    }
                },100);
            });
        }

        function updateEffect(message) {
            var state = parseHash();
            var ci = message.channel;
            var ei = message.effectIndex;
            state.channels[ci].effects[ei] = message.effect;
            window.location.hash = JSON.stringify(state);
        }

        function addEffect(message) {
            var channel = message.channel;
            var state = parseHash();
            state.channels[channel].effects.push(message.effect);
            window.location.hash = JSON.stringify(state);
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

        function setupEffectEditHandler(link, channel, effectIndex) {
            link.click(function() {
                var state = parseHash();
                var effectType = state.channels[channel].effects[effectIndex].name;
                var effectParams = state.channels[channel].effects[effectIndex].params;
                window.open("/effect_templates/" + effectType + ".html?channel=" + channel + "&position=" + effectIndex + "#" + JSON.stringify(effectParams), "MsgWindow" + Math.random(), "width=600, height=400");
            });
        };

        function showChannelStripSettings(channelIndex) {
            var state = parseHash();
            var channelState = state.channels[channelIndex];
            var effects = channelState.effects;
            $("#effects-menu-list").empty();
            for (var i = 0; i < effects.length; i++) {
                var effect = effects[i];
                var link = $("<li class='pure-menu-item'><span class='pure-menu-link'>" + effect.name + "<span class='effect-edit' id='effect-edit-" + channelIndex + '-' + i + "'><i class='fa fa-pencil'></i></span></span></li>");
                setupEffectEditHandler(link, channelIndex, i);
                $("#effects-menu-list").append(link);
            }
            var newEffectNode = $("<li class='pure-menu-item'><span class='pure-menu-link'>New effect</span></li>");
            $(newEffectNode).click(function() {
                var myWindow = window.open("/menu.html?channel=" + channelIndex, "MsgWindow" + Math.random(), "width=200, height=300");
            });
            $("#effects-menu-list").append(newEffectNode);
        };

        function inflateTemplate(template, params) {
            var templateSource = $("#template-" + template).html();
            return Mustache.render(templateSource, params);
        }
    };
}());
