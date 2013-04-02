var api = "AIzaSyAbXMOmMjcXU2VkDjjYWYvRPMDyVYF8t_Q";
var apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=" + api;

//make .css() return current css of element
jQuery.fn.css2 = jQuery.fn.css;
jQuery.fn.css = function() {
    if (arguments.length) return jQuery.fn.css2.apply(this, arguments);
    var attr = ['font-family','font-size','font-weight','font-style','color',
        'text-transform','text-decoration','letter-spacing','word-spacing',
        'line-height','text-align','vertical-align','direction','background-color',
        'background-image','background-repeat','background-position',
        'background-attachment','opacity','width','height','top','right','bottom',
        'left','margin-top','margin-right','margin-bottom','margin-left',
        'padding-top','padding-right','padding-bottom','padding-left',
        'border-top-width','border-right-width','border-bottom-width',
        'border-left-width','border-top-color','border-right-color',
        'border-bottom-color','border-left-color','border-top-style',
        'border-right-style','border-bottom-style','border-left-style','position',
        'display','visibility','z-index','overflow-x','overflow-y','white-space',
        'clip','float','clear','cursor','list-style-image','list-style-position',
        'list-style-type','marker-offset'];
    var len = attr.length, obj = {};
    for (var i = 0; i < len; i++)
        obj[attr[i]] = jQuery.fn.css2.call(this, attr[i]);
    return obj;
};


$.getJSON(apiUrl, function(fonts){
    var output;
    $.each(fonts.items, function(key,val){
       output += "<option value='" + val.family +"'>" + val.family + "</option>";
    });
    $('#font-list').append(output);

});

$(function() {
// setInterval(function() { ObserveInputValue($('input').val()); }, 100);

    // var target = $('#content h2');
    function loadFont(data) {
    var link = $("<link>");
    link.attr({
        type: 'text/css',
        rel: 'stylesheet',
        href: 'http://fonts.googleapis.com/css?family=' + data
    });
    $("head").append(link);
    }

//Set fields

    function setConfig(element) {
        elemStyles = element.css();
        console.log(elemStyles['font-family']);
        controls = $('#controls > *');
        for (var i=0; i <= controls.length-1; i++) {
            dataValue = $(controls[i]).data('font');
            cleanValue = elemStyles[dataValue].replace(/'/g, "");
            $(controls[i]).val(cleanValue);
        }
    }

//Events
target = $('#content').children().first();
//Get Target

    $('#content').children().on('click', function() {
        target = $(this);
        // console.log(target.css());
        setConfig(target);
    });

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