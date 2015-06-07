(function() {
    var oldHash = window.location.hash;
    function inflateTemplate(template, params) {
        var templateSource = $("#template-" + template).html();
        return Mustache.render(templateSource, params);
    }

    function updateTweetButton() {
        var url = window.location.href;

        var googleAPIKey = 'AIzaSyDSuCnC28-3zDVm6HEuARwqUN-YAwivxss';
        $.ajax({
            url:"https://www.googleapis.com/urlshortener/v1/url?key=" + googleAPIKey,
            type:"POST",
            data:JSON.stringify({"longUrl": url}),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(response){
                var url = response.id;
                $("#tweet-button").empty();
                $("#tweet-button").html(inflateTemplate("tweet-button", {"url": url}));
                window.twttr.widgets.load();
            }
        });
    }
    setInterval(function() {
        if (oldHash != window.location.hash) {
            console.log("hash update");
            updateTweetButton();
            oldHash = window.location.hash;
        }
    });
}());
