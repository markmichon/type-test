var api = "AIzaSyAbXMOmMjcXU2VkDjjYWYvRPMDyVYF8t_Q";
var apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=" + api;
var systemFonts = ['Times', 'Helvetica Neue', 'Helvetica', 'Georgia'];
var loadedFonts = [];
var elements = [];

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

var fonts = {
    system: {
        families: []
    },
    google: {
        families: []
    },
    typekit: {
        families: []
    }
};

function TextBlock() {
    var $el = this;
        this.elemStyles = {
            elemType : 'h1',
            elemFontSize : '',
            elemFontFamily : 'Helvetica Neue, Helvetica, Arial, sans-serif',
            elemFontWeight : '',
            elemLineHeight : '',
            elemMarginBottom : '',
            elemMarginTop : '',
            elemFontStyle : '',
            elemTextAlign : ''

        };

    this.createElement = function() {
        $elementList.append(this);
    };

    this.setStyles = function(target) {
        $(target).css({
            fontSize: this.elemStyles.elemFontSize,
            fontFamily: this.elemStyles.elemFontFamily,
            fontWeight: this.elemStyles.elemFontWeight,
            lineHeight: this.elemStyles.elemLineHeight,
            marginBottom: this.elemStyles.elemMarginBottom,
            marginTop: this.elemStyles.elemMarginTop,
            fontStyle: this.elemStyles.elemFontStyle,
            textAlign: this.elemStyles.elemTextAlign
        });
    };

}
var header1 = new TextBlock();

function compileFonts() {
    var google = getGoogleFonts();
    fonts.system.families = systemFonts;
    fonts.google.families = google;
    //Typekit TBD
}

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
    var fontList = [];
    for (var val in fonts) {
        // console.log(fonts[val]);
        for (var fam in fonts[val]) {
            fontList = fontList.concat(fonts[val][fam]);
        }
    }
    // console.log(fontList);
    var select = "";
    for (val in fontList) {
        select += '<option value="' + fontList[val] + '">' + fontList[val] + '</option>';
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
    for (var x in fonts.google.families) {
        if (data === fonts.google.families[x])
        {
            tempArray = [data];
            WebFont.load({
                google: {families: tempArray}
            });
        }
    }
    }


// check if font has already been loaded, if not load & add to loaded array
function checkIsLoaded(fontName) {

        if (loadedFonts.indexOf(fontName) === -1) {
            loadedFonts.push(fontName);
            loadFont(fontName);
        }
}



$(document).ready(function() {
    content = $('#content');
    compileFonts();
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