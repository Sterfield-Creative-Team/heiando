/**
 * Created Pushka.
 * Date: 20/09/2010
 * Time: 9:26:06 AM
 */

 var CafeSydney = {};

 CafeSydney.Forms = (function ($) {

    return {
        Initialise: function () {
            var DAY = 24 * 60 * 60 * 1000;
            var $p = $('span.wpcf7-form-control-wrap.booking-date');
            var $picker;
            var $hour = $('select[name=hour]');
            var $minute = $('select[name=minute]');
            var hours = $hour.html();
            var minutes = $minute.html();

            $hour.on("change", function(){
                var date = $picker.datepicker("getDate");
                if(date.getDay() === 0){
                    if($hour.val() == "2"){
                        $minute.html('<option value=""></option><option value="00">00</option><option value="15">15</option><option value="30">30</option>');
                    } else {
                        $minute.html(minutes);
                    }
                } else {
                    $minute.html(minutes);
                }
            });


            var now = new Date();
            now.setHours(0,0,0,0);

            // TO TEST
            //now.setDate(8); //etc

            var nowMs = now.getTime();
            var thenMs;

            $p.append(
                $picker = $('<div id="datepicker-control"></div>').datepicker({
										defaultDate: null,
                    altField: $p.find('input').hide(),
                    dateFormat: 'dd-mm-yy',
                    beforeShowDay: function(then) {
                        then.setHours(0, 0, 0, 0);
                        thenMs = then.getTime();

                        // Today
                        if(thenMs === nowMs) {
                            return [false, "ui-state-highlight"];
                        }

                        // Past
                        else if(thenMs < nowMs) {
                            return [false];
                        }

                        // if its a saturday or sunday and we are less than 2 days away...
                        else if(then.getDay() === 0 || then.getDay() === 5 || then.getDay() === 7){
                            if(thenMs - nowMs < DAY * 2) {
                                // a css class can go in the middle argument
                                return [false, ".cs-form-msg", "Weekend bookings must be made 48hrs in advance"];
                            }
                        }
                        else if(then.getDay() === 0 || then.getDay() === 6){
                            if(thenMs - nowMs < DAY * 3) {
                                // a css class can go in the middle argument
                                return [false, ".cs-form-msg", "Weekend bookings must be made 48hrs in advance"];
                            }
                        }
												
//                        else if(then.getDay() === 1 || then.getDay() === 2 || then.getDay() === 3 || then.getDay() === 4){
//                            if(thenMs - nowMs < DAY) {
//                                // a css class can go in the middle argument
//                                return [false, ".cs-form-msg", "Weekend bookings must be made 48hrs in advance"];
//                            }
//                        }
												

                        // otherwise make sure we are a day away
                        else if(thenMs - nowMs < DAY) {
                            return [false, ".cs-form-msg", "Bookings must be made 24hrs in advance"];
                        }

                        return [true];
                    },
                    onSelect: function() {
                        var then = $picker.datepicker("getDate");
                        thenMs = then.getTime();
                        $hour.empty();
                        $minute.html(minutes);

                        // sunday
                        if(then.getDay() === 0) {
                            $hour.html(
                                '<option value=""></option>' + 
                                '<option value="12">12</option>' + 
                                '<option value="1">1</option>' +
                                '<option value="2">2</option>'
                            );
                        }
                        // 24 hours.
                        else if (thenMs - nowMs < DAY * 2) {
                            $hour.html(
                                '<option value="">Please contact Cafe Sydney reservations on +61 2 9251 8683</option>'
                            );
                            $(".hour select").css({
                                background: "#900",
                                color: "#FFF"
                            });
                            $(".minute").css("visibility","hidden");
                        }
                        // saturday
                        else if(then.getDay() === 6) {
                            $hour.html(
                                '<option value="">Please contact Cafe Sydney reservations on +61 2 9251 8683</option>' //+ 
//                                '<option value="17">17</option>' + 
//                                '<option value="18">18</option>' + 
//                                '<option value="19">19</option>' + 
//                                '<option value="20">20</option>' + 
//                                '<option value="21">21</option>' + 
//                                '<option value="22">22</option>' + 
//                                '<option value="23">23</option>'
                            );
							$(".hour select").css({
								background: "#900", 
								color: "#FFF"
							});
							$(".minute").css("visibility","hidden");
                        } 

                        // mid-week
                        else {
                            $hour.html(hours);
							$(".hour select").css({
								background: "#FFF", 
								color: "#000"
							});
							$(".minute").css("visibility","visible");
                        }

                    }
                })
            );
						$picker.datepicker("setDate", null);
        }
    };

})(jQuery);

CafeSydney.Gallery = (function ($) {

    return {
        Initialise: function () {

            $('.gallery dl.gallery-item').each(function(){

                var $this = $(this);

                $this.find("img").one('load', function(){

                   var $roll = $("<div />")
                   .addClass("gallery-rollover")
                   .width($(this).width())
                   .height($(this).height())
                   .hide()
                   .click(function(){ $(this).parent().find("a").click(); })
                   .prependTo($this);

                   $this.mouseenter(function(){
                    $roll.fadeTo(300, 0.7);
                }).mouseleave(function(){
                    $roll.fadeTo(300, 0.0);
                });

            }).each(function(){

                    // img could already be loaded, if so call it's load method
                    if(this.complete) {
                        $(this).load();
                    }

                });

        });

            // colorbox...
            var id = 0;
            $('.entry-content .gallery').each(function(){
                $(this).find('a').colorbox();
            });

            /*
            // TODO: fix up rollovers and incorporate colorbox (loop thru each set)
            $item = $('.gallery dl.gallery-item');

            $item.find("img").load(function() {

                $self = $(this);
                $dl = $self.closest("dl");

                var $roll = $('<div class="gallery-rollover"></div>')
                        .width($self.width())
                        .height($self.height())
                        .css('line-height', $self.height() + 'px')
                        .hide()
                        .prependTo($dl)
                        .click(function() {
                    // div blocks the click, so click the a tag
                    $(this).parent().find("a").click();
                });

                $dl.mouseenter(function() {
                    $roll.fadeTo(300, 0.7);
                }).mouseleave(function() {
                    $roll.fadeTo(300, 0.0);
                });

            });
*/


}
};
})(jQuery);

CafeSydney.Header = (function ($) {

    function resizeImageToFit() {

        matchedWidth = $("#masthead").width();
        matchedHeight = $("#masthead").height();

        $("ul > li:last").addClass("last");

        $("#slideshow img")
        .attr("width", matchedWidth)
        .attr("height", matchedHeight)
        .css({
            "width" : matchedWidth,
            "height" : matchedHeight
        });

    }

    return {
        Initialise: function (images) {

            // create images, but don't load them
            // store src in original attrib so we can lazily loaded them
            $.each(images, function(index, value) {
                $("#slideshow").append(
                    $("<img />").attr("original",value).css({"display": "none"})
                    );
            });

            // set the sizes and listen for resizes
            $(window).resize(resizeImageToFit);
            resizeImageToFit();

            var timeout = 5000;
            var speed = 1000;
            var $slideshow = $('#slideshow');
            var slides = $slideshow.children();
            var totalSlides = slides.length;
            var current = 0;
            var next = 1;

            var doTransition = function() {
                $(slides[current]).delay(timeout).fadeOut(speed);

                $(slides[next]).delay(timeout).fadeIn(speed, function() {
                    current = (current + 1) % totalSlides;
                    next = (current + 1) % totalSlides;

                    var $nxt = $(slides[next]);

                    // see if the next slide is loaded
                    if($nxt.attr("src")) {

                        // it is, show it
                        doTransition();

                    } else {
                        $nxt.bind("load", function(){

                            // tidy up and show image
                            $(this).unbind("load");
                            doTransition();

                        }).attr("src", $nxt.attr("original")).removeAttr("original");
                    }

                });

            }

            // no point transitioning if we only have 1 image
            if(totalSlides > 1) {
                doTransition();
            }
        }
    };
})(jQuery);






jQuery(document).ready(function($) {
	$("#wpsc_checkout_form_25").val('');
	$("#wpsc_checkout_form_25").datepicker({ 
		dateFormat: "DD, d MM yy",
		minDate: 1,
		beforeShowDay: $.datepicker.noWeekends });
	$("#wpsc_checkout_form_7").attr('disabled', '');
	$("#wpsc_checkout_form_7").val('AU');
	$("#wpsc_checkout_form_22").on("keyup change", function() {
		var limit = 100,
			$this = $(this),
			txt = $this.val();
		if (txt.length >= limit) {
			$this.val(txt.substr(0, limit));
		}
	});
	$("a[rel='cam']").colorbox({inline: true, innerWidth:660, innerHeight: 480});
	/* unblock when ajax activity stops*/ 
	$(document).ajaxStop($.unblockUI); 
	$('#BuyPayPal').click(function() { 
		$.blockUI({ message: $('#domMessage') }); 
	}); 

})