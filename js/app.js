var api = "AIzaSyAbXMOmMjcXU2VkDjjYWYvRPMDyVYF8t_Q";
var apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=" + api;
var loadedFonts = [];
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

// Get Google Webfonts

function getGoogleFonts() {
    var output = [];
    $.ajax({
        dataType: 'json',
        // url: apiUrl,
        url: '../google.json',
        async: false,
        success: function(fonts) {
            $.each(fonts.items, function(key,val){
            // console.log(val['family']);
            output.push(val['family']);
            });
        }
    });
    return output;
}

// Combine all Fonts into single Array, write select list
function generateFontList() {
    google = getGoogleFonts();
    var fontArray = ['Times', 'Helvetica Neue', 'Helvetica', 'Georgia'];
    fontArray = fontArray.concat(google);
    var select = "";
    for (var val in fontArray) {
        select += '<option value="' + fontArray[val] + '">' + fontArray[val] + '</option>';
    }
    $('#font-list').append(select);

}

//Set fields to match current element

    function setConfig(element) {
        elemStyles = element.css();
        controls = $('#controls > [data-style]');
        for (var i=0; i <= controls.length-1; i++) {
            dataValue = $(controls[i]).data('style');
            cleanValue = elemStyles[dataValue].replace(/'/g, "");
            $(controls[i]).val(cleanValue);
        }
    }


function loadFont(data) {
    // var link = $("<link>");
    // link.attr({
    //     type: 'text/css',
    //     rel: 'stylesheet',
    //     href: 'http://fonts.googleapis.com/css?family=' + data
    // });
    // $("head").append(link);
    }

function loadFont(data) {
    WebFont.load({
        google: {
            families: data
        }
    });
    }


// check if font has already been loaded, if not load & add to loaded array
function checkIsLoaded(fontName) {

        if (loadedFonts.indexOf(fontName) === -1) {
            loadedFonts.push(fontName);
            var tempArray = [fontName];
            loadFont(tempArray);
        }
}



$(document).ready(function() {
    content = $('#content');
    generateFontList();


//Events

target = $('#content').children().first(); // set default target
//Get Target

    $('#content').on('click','h1, h2, h3, h4, h5, p' ,function() {
        target = $(this);
        // console.log(target.css());
        setConfig(target);
    });

//Font-Family
    $('body').on("change", "#font-list", function(){
       family = $(this).val();
        checkIsLoaded(family); //load family
        $(target).css({
            'fontFamily' : family
        });
    });
//property change
    $('body').on('keyup', 'input', function() {
        property = $(this).data('style');
        value = $(this).val();
        $(target).css(property, value);
    });

//New Paragraph

    $('#js-newElement').on('click', function(e){
        e.preventDefault();
        var element = $('<p contenteditable>');
        element.text('Enter some Text');
        content.append(element);
    });


}); //end