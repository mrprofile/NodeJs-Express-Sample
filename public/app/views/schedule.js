require(['../../lib/common'], function (common){
	require(['require', 'jquery', 'jquery.ui', 'jquery.ddslick'], function(require, jquery, jqueryui, ddslick){

		$(".jump-link").on("click", function (event) {
	        event.preventDefault();
	        var coeff = 60000 * 30;
	        var currentDate = new Date();
	        var rounded = new Date(Math.floor(currentDate.getTime() / coeff) * coeff);
	        var currHr = rounded.getHours();
	        var currMin = rounded.getMinutes();
	        var sliderVal = currHr * 2;
	        if (currMin == 30) { sliderVal = sliderVal + 1; }        
	        if (sliderVal <= 40) {
	            sliderObj.slider("value", sliderVal);
	        } else {
	            sliderObj.slider("value", 40);
	            sliderVal = 40;
	        }
	        sliderObj.trigger('slidechange');
	    });

	    $("#slider").slider({
        max:46,
        slide: function (event, ui) {            
            if (ui.value > 40) {
                event.preventDefault();
            } else if (ui.value == 38) {
                $('#showsContainerChild').css("right", (ui.value + 2) * 207 + "px");
            } else if (ui.value > 38) {
                $('#showsContainerChild').css("right", (ui.value + 4) * 207 + "px");
            }else {                               
                $('#showsContainerChild').css("right", ui.value * 207 + "px");
            }
        },
        change: function (event, ui) {            
            if (ui.value > 40) {
                event.preventDefault();
            } else if (ui.value == 38) {
                $('#showsContainerChild').css("right", (ui.value + 2) * 207 + "px");
            } else if (ui.value > 38) {
                $('#showsContainerChild').css("right", (ui.value + 4) * 207 + "px");
            } else {
                $('#showsContainerChild').css("right", ui.value * 207 + "px");
            }
        }
    });

    var sliderObj = $("#slider").slider("widget");  

		$('#show-filter').ddslick({
	        onSelected: function (data) {
	            $('#show-filter').show();
	            filter(data.selectedData.value);
	        }
	    });

	    $('#day-filter').ddslick({
	        width: '100%',
	        background: '#1f2b3b',
	        defaultSelectedIndex : 0,
	        onSelected: function (data) {
	            $(".schedule-wrapper ul[class^='day']").hide();
	            $('.schedule-wrapper ul[class="' + data.selectedData.value + '"]').show();
	        }
	    });


     	$("#filter-list a").on("click", function (event) {
	        event.preventDefault();
	       
	        var id = $(event.target).attr("id");
	       
	        filter(id);
	        $('#show-filter').ddslick('select', { index: showIndexHash[id] });
	    });

	    if (window.location.hash) {
        // Highlight featured
        var showId = window.location.hash.replace("#", "");
        filter(showId);
        $('#show-filter').ddslick('select', { index: showIndexHash[showId] });
    }


    $(".jump-link").trigger("click");

	    function filter(id) {
			$("#showsContainerChild li").removeClass("selected");
		    $("#filter-list a").removeClass("filter-selected");

		    if (id == "") { id = "-1" };
		    $("." + id).addClass("selected");
		    $("#filter-list li #" + id).addClass("filter-selected");
		    $("#slider div").removeClass("selected");
		    $("#showsContainerChild li").each(function (i, element) {
		        if ($(element).hasClass("selected")) {            
		            var eleId = $(element).attr("id").split("-");
		            $("#highdiv-" + eleId[1]).addClass("selected");            
		        }
		    });
	    };

	});
});