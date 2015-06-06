(function() {
    $(document).ready(function() {
        var params = JSON.parse(window.location.hash.substring(1));
        var currentValue = (params.pan*100.0).toFixed(2);
        $("#pan").val();
        var previousValue = currentValue;
        setInterval(function() {
            var value = $("#pan").val()/100.0;

            if (value.toFixed(2) != previousValue) {
                console.log("sending message");
                TemplateBase.newEffectState({"name": "stereoPan", "params": {"pan": value}});
            }

            $(".value").text(value.toFixed(2));

            previousValue = value.toFixed(2);
        }, 30);
    });
}());
