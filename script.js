
$( document ).ready(function() {

    //Fixed Header
    var wrap = $("#wrap");
    var showFixedHeader;

    $(window).scroll(function(e) {

        if($(window).width() <= 960){
            showFixedHeader = 50;
        }else{
            showFixedHeader = 350;
        }

        if ($(window).scrollTop() > showFixedHeader) {
            wrap.addClass("notransition");
            wrap.addClass("backgroundtransition");
            wrap.addClass("fix-header");
        } else {
            wrap.removeClass("fix-header");
            wrap.removeClass("backgroundtransition");
            wrap.removeClass("notransition");
        }

    });

    //Quotes

    var quoteBoxes = [$("#quote1"),$("#quote2"),$("#quote3")];
    var quoteText = [];
    var currentQuotes = [];
    $.getJSON( "recommendations.json", function( data ) {
        quoteText = data;
        initQuotes();
        window.setInterval(function(){
            changeQuote();
        }, 10000);

    });

    var initQuotes = function(){
        currentQuotes = [];
        var texts = quoteText.slice();

        $.each(quoteBoxes, function(key,value){

            var index = getRand(0,texts.length);

            currentQuotes[key] = texts[index];
            updateBox(value,texts[index].text,texts[index].author);

            texts.splice(index,1);
        });
    }

    var changeQuote = function(){

        //Choose random Box
        var boxIndex = getRand(0,quoteBoxes.length);
        var box = quoteBoxes[boxIndex];

        //Get free quote
        var remainingQuotes = quoteText.slice();
        remainingQuotes = jQuery.grep(remainingQuotes, function(value) {
            return jQuery.inArray(value,currentQuotes) <= -1;
        });
        var newQuote = remainingQuotes[getRand(0,remainingQuotes.length)];

        //Update with animation
        box.find("p").fadeOut(500, function() {
            $(this).text(newQuote.text).fadeIn(500);
        });
        box.find("footer").fadeOut(500, function() {
            $(this).text(newQuote.author).fadeIn(500);
        });

        //store new one as current Quote
        currentQuotes[boxIndex] = newQuote;
    };

    var updateBox = function(box,text,author){
        box.find("p").html(text);
        box.find("footer").html(author);
    };

    var getRand = function(start,endIncl){
        return Math.floor(Math.random() * endIncl) + start;
    };
});