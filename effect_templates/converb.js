(function() {
    $(document).ready(function() {
        var params = JSON.parse(window.location.hash.substring(1));
        var currentValue = params;
        $("#dry-value").val((params.dry*100.0).toFixed(2));
        $("#wet-value").val((params.wet*100.0).toFixed(2));
        var previousValue = currentValue;
        setInterval(function() {
            var dry_value = $("#dry-value").val()/100.0;
            var wet_value = $("#wet-value").val()/100.0;
            var value = {"dry":dry_value, "wet":wet_value};
            if (value.dry.toFixed(2) != previousValue.dry.toFixed(2) ||
                value.wet.toFixed(2) != previousValue.wet.toFixed(2)) {
                console.log(value)
                TemplateBase.newEffectState({"name": "converb", "params": value});
            };

            $(".dry-value").text(dry_value);
            $(".wet-value").text(wet_value);

            previousValue = value;
        }, 30);
    });
}());
