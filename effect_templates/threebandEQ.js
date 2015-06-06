(function() {
    $(document).ready(function() {
        var params = JSON.parse(window.location.hash.substring(1));
        var currentValue = params;
        $("#low-value").val();
        $("#mid-value").val();
        $("#hi-value").val();
        var previousValue = currentValue;
        setInterval(function() {
            var low_value = $("#low-value").val();
            var mid_value = $("#mid-value").val();
            var hi_value = $("#hi-value").val();
            var value = {"bassgain":low_value, "midgain":mid_value, "treblegain":hi_value};
            if (value != previousValue) {
                console.log(value)
                TemplateBase.newEffectState({"name": "threebandEQ", "params": value});
            };

            $(".low-value").text(low_value);
            $(".mid-value").text(mid_value);
            $(".hi-value").text(hi_value);

            previousValue = value;
        }, 30);
    });
}());
