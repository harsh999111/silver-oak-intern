(function ($) {

    $.fn.rating = function (method, options) {
        method = method || 'create';
    
        var settings = $.extend({
        
            limit: 5,
            value: 0,
            glyph: "glyphicon-star",
            coloroff: "gray",
            coloron: "gold",
            size: "1.3em",
            cursor: "pointer",
            onClick: function () {
            },
            endofarray: "idontmatter"
        }, options);
        var style = "";
        style = style + "font-size:" + settings.size + "; ";
        style = style + "color:" + settings.coloroff + "; ";
        style = style + "cursor:" + settings.cursor + "; ";


        if (method == 'create') {
    
            this.each(function () {
                attr = $(this).attr('data-rating');
                if (attr === undefined || attr === false) {
                    $(this).attr('data-rating', settings.value);
                }
            });

            
            for (var i = 0; i < settings.limit; i++) {
                this.append('<span data-value="' + (i + 1) + '" class="ratingicon glyphicon ' + settings.glyph + '" style="' + style + '" aria-hidden="true"></span>');
            }

            $('.ratingicon').mouseover(function () {
                var starValue = $(this).data('value');
                var ratingIcons = $('.ratingicon');
                for (var i = 0; i < starValue; i++) {
                    $(ratingIcons[i]).css('color', settings.coloron);
                }
            }).mouseout(function () {
                var currentRate = $(this).parent().attr('data-rating');
                var ratingIcons = $('.ratingicon');
                for (var i = ratingIcons.length; i >= currentRate; i--) {
                    $(ratingIcons[i]).css('color', settings.coloroff);
                }
            });

            
            this.each(function () {
                paint($(this));
            });

        }
        if (method == 'set') {
            this.attr('data-rating', options);
            this.each(function () {
                paint($(this));
            });
        }
        if (method == 'get') {
            return this.attr('data-rating');
        }
    
        this.find("span.ratingicon").click(function () {
            rating = $(this).attr('data-value');
            $(this).parent().attr('data-rating', rating);
            paint($(this).parent());
            settings.onClick.call($(this).parent());
        });
        function paint(div) {
            rating = parseInt(div.attr('data-rating'));
            div.find("input").val(rating);	
            div.find("span.ratingicon").each(function () {	

                var rating = parseInt($(this).parent().attr('data-rating'));
                var value = parseInt($(this).attr('data-value'));
                if (value > rating) {
                    $(this).css('color', settings.coloroff);
                }
                else {
                    $(this).css('color', settings.coloron);
                }
            })
        }
    };
}(jQuery));
