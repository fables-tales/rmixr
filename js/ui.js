window.DawUI = (function() {
    window.parseHash = function() {
        var hash = window.location.hash;
        var state = JSON.parse(hash.substring(1));
        return state;
    }
    return function() {
        window.headClicked = false;
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

                    if (window.currentChannelStrip) {
                        var amplitude = window.stripCollection.getAmplitude(window.currentChannelStrip);
                        var height = amplitude*1000+10;
                        $("#amplitude").height(height);
                    }

                    $("#currentTime").text(window.transport.audioTime());

                    if (!window.headClicked) {
                        var alongness = window.transport.audioTime()/window.transport.duration();
                        var width = $("#main").width();
                        $(".playhead").css({"left": width*alongness + "px"});
                    }
                    if (window.transport.audioTime() >= window.transport.duration()) {
                        window.transport.reset();
                        $("#playPause").html("<i class='fa fa-play'></i>");
                    }
                },16);
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
            showChannelStripSettings(channel);
        }

        function initUI() {
            $("#playPause").click(function() {
                window.togglePlayPause();
            });

            $("#main").mousedown(function() {
                window.headClicked = true;
                window.transport.pause();
            });

            var newTime = 0;

            $("#main").mousemove(function(e) {
                if (window.headClicked) {
                    var x = e.pageX;
                    var boundaryLeft = $("#main").offset().left;
                    var width = $("#main").width();
                    var alongness = (x-boundaryLeft)/width;
                    console.log("setting audio time");
                    newTime = alongness*window.transport.duration();
                    $(".playhead").css({"left": width*alongness});
                }
            });

            $("#main").mouseup(function() {
                window.headClicked = false;
                window.transport.play();
                setTimeout(function() { window.transport.setAudioTime(newTime); }, 16);
            });
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
            var linkElement = $(inflateTemplate("channel", {
                "title": "Channel "+index,
                "muted":channel.gain===0,
                "muted-input-id":"muted-input-"+index
            }));

            linkElement.click(function() {
                $(".email-item-selected").each(function(i,e) {
                    $(e).removeClass("email-item-selected");
                });
                $(this).addClass("email-item-selected");
                showChannelStripSettings(index);
                window.currentChannelStrip = index;
            });

            linkElement.find('#muted-input-'+index).click(function(){
                state = parseHash();
                state.channels[index].notmuted = $(this).is(':checked');
                console.log(state);
                window.location.hash = JSON.stringify(state);
            });

            return linkElement;
        }

        function setupEffectEditHandler(link, channel, effectIndex) {
            link.find(".btn-edit").click(function() {
                var state = parseHash();
                var effectType = state.channels[channel].effects[effectIndex].name;
                var effectParams = state.channels[channel].effects[effectIndex].params;
                window.open(".//effect_templates/" + effectType + ".html?channel=" + channel + "&position=" + effectIndex + "#" + JSON.stringify(effectParams), "MsgWindow" + Math.random(), "width=600, height=400");
            });
            link.find(".btn-remove").click(function() {
                var state = parseHash();
                state.channels[channel].effects.splice(effectIndex, 1);
                window.location.hash = JSON.stringify(state);
                showChannelStripSettings(channel);
            });
        };

        function showChannelStripSettings(channelIndex) {
            var state = parseHash();
            var channelState = state.channels[channelIndex];
            var effects = channelState.effects;
            $("#effects-menu-list").empty();
            for (var i = 0; i < effects.length; i++) {
                var effect = effects[i];
                var link = $(inflateTemplate("effect", effect));
                setupEffectEditHandler(link, channelIndex, i);
                $("#effects-menu-list").append(link);
            }
            $("#effects-menu-list").sortable({
                axis: "y",
                containment:"parent",
                start: function(e, ui) {
                    // creates a temporary attribute on the element with the old index
                    $(this).attr('data-previndex', ui.item.index());
                },
                update: function(e, ui) {
                    // gets the new and old index then removes the temporary attribute
                    var newIndex = ui.item.index();
                    var oldIndex = $(this).attr('data-previndex');
                    $(this).removeAttr('data-previndex');
                    var state = parseHash();
                    var channelState = state.channels[channelIndex];
                    var old = channelState.effects.splice(oldIndex, 1);
                    channelState.effects.splice(newIndex, 0, old[0]);
                    window.location.hash = JSON.stringify(state);
                    showChannelStripSettings(channelIndex);
                }
            });

            var newEffectNode = $("<li class='pure-menu-item'><span class='pure-menu-link'>New effect<span class='effect-edit effect-edit-spacing pull-right btn btn-small btn-default'><i class='fa fa-plus'></i></span></span></li>");
            $(newEffectNode).click(function() {
                var myWindow = window.open("./menu.html?channel=" + channelIndex, "MsgWindow" + Math.random(), "width=600, height=400");
            });
            $("#effects-menu-list-new").html(newEffectNode);
        };

        function inflateTemplate(template, params) {
            var templateSource = $("#template-" + template).html();
            return Mustache.render(templateSource, params);
        }
    };
}());
