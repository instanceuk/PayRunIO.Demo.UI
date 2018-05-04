var previousCallData = [];

$(function() {
    if (!Templates.loaded) {
        Templates.onLoaded = getLogs();
    }
    else {
        getLogs();
    }

    $(document).on("click", ".btn-copy", function () {
        var $self = $(this);
        var $code = $self.parent().find("code");
        var text = $code.text();

        copyTextToClipboard(text);
    });

    $(document).on("click", ".summary", function () {
        var $self = $(this);
        var id = $self.attr("data-id");

        $(".request-and-response[data-id!=" + id + "]").hide();
        $(".summary[data-id!=" + id + "]").removeClass("col-sm-3").addClass("col-sm-12");
        
        var $requestAndResponse = $self.parent().find(".request-and-response");

        $requestAndResponse.toggle();

        if ($requestAndResponse.is(":visible")) {
            $self.removeClass("col-sm-12").addClass("col-sm-3");
        }
        else {
            $self.removeClass("col-sm-3").addClass("col-sm-12");
        }
    });    
});

function getLogs() {
    $.get("/api-calls/data").then(function(data) {
        var context = { 
            data: data
        };

        if (previousCallData.length !== data.length) {
            $(".api-calls-container").html(Templates["apiCallsTemplate"](context));

            tippy(".btn");
        }

        previousCallData = data;

        setTimeout(getLogs, 1500);
    });
}

function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
  
    document.body.removeChild(textArea);
}  