(function() {
    $(document).ready(function() {
        var params = JSON.parse(window.location.hash.substring(1));
        var currentValue = params;
        $("#rate-value").val((params.rate*100.0).toFixed(2));
        $("#feedback-value").val((params.feedback*100.0).toFixed(2));
        $("#delay-value").val((params.delay*100.0).toFixed(2));
        var previousValue = currentValue;
        setInterval(function() {
            var rate_value = $("#rate-value").val()/100.0;
            var feedback_value = $("#feedback-value").val()/100.0;
            var delay_value = $("#delay-value").val()/100.0;
            var value = {"rate":rate_value, "feedback":feedback_value, "delay":delay_value};
            if (value.rate.toFixed(2) != previousValue.rate.toFixed(2) ||
                value.feedback.toFixed(2) != previousValue.feedback.toFixed(2) ||
                value.delay.toFixed(2) != previousValue.delay.toFixed(2)) {
                console.log(value)
                TemplateBase.newEffectState({"name": "chorus", "params": value});
            };

            $(".rate-value").text(rate_value);
            $(".feedback-value").text(feedback_value);
            $(".delay-value").text(delay_value);

            previousValue = value;
        }, 30);
    });
}());
