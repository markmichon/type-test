var api = "AIzaSyAbXMOmMjcXU2VkDjjYWYvRPMDyVYF8t_Q";
var apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=" + api;

$.getJSON(apiUrl, function(fonts){
    var output;
    $.each(fonts.items, function(key,val){
       output += "<option value='" + val.family +"'>" + val.family + "</option>";
    });
    $('#font-list').append(output);

});

$(function() {
// setInterval(function() { ObserveInputValue($('input').val()); }, 100);

    var target = $('#content h2');
    function loadFont(data) {
    var link = $("<link>");
    link.attr({
        type: 'text/css',
        rel: 'stylesheet',
        href: 'http://fonts.googleapis.com/css?family=' + data
    });
    $("head").append(link);
    }

//Events
//Font-Family
    $('body').on("change", "#font-list", function(){
       family = $(this).val();
        loadFont(family); //load family
        $(target).css({
            'fontFamily' : family
        });
    });
//property change
    $('body').on('keyup', 'input', function() {
        property = $(this).data('font');
        value = $(this).val();
        $(target).css(property, value);
    });


// //font-weight
//     $('body').on('keyup', '#font-weight', function() {
//         fontSize = $(this).val();
//         $(target).css('fontWeight', fontSize);
//     });

}); //end