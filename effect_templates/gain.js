(function() {
    $(document).ready(function() {
        var params = JSON.parse(window.location.hash.substring(1));
        var currentValue = (params.gain*100.0).toFixed(2);
        $("#multiply").val();
        var previousValue = currentValue;
        setInterval(function() {
            var value = $("#multiply").val()/100.0;

            if (value.toFixed(2) != previousValue) {
                TemplateBase.newEffectState({"name": "gain", "params": {"gain": value}});
            }

            $(".value").text(value.toFixed(2));

            previousValue = value.toFixed(2);
        }, 30);
    });
}());
