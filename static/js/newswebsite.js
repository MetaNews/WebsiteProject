
$(document).ready(function(){
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
    });
    
    resizer($('#top-nav').width(), 962);
    
    $("#quality-btns button").click(function(){
    	$(".btn-group button").removeClass("active");
    	$(this).addClass("active");
    });
});

$(window).on('resize', function(){
    var win = $(this); //this = window
    screenLen = $('#top-nav').width();
    // elemLen = 151 + $('#quality-tabs').width() + $('#ideo-tabs').width() + $('#advanced-search').width();
    elemLen = 962;
    resizer(screenLen, elemLen);
});

function resizer(screenLen, elemLen) {
    if (screenLen < 768 )
    {
    	//Navbar Items
    	
    	$('#advanced-search').css("display", "table")
    	$('#ideo-tabs').css("display", "none");
    	$('#quality-btns').css("display", "none");
    	
    	$('#top-nav-wrapper').css("height", 110);
    	
    	//Menu Items
    	
    	$('#legit').css("display", "block");
    	$('#fake').css("display", "block");
    	$('#quality-sep').css("display", "list-item");
    	$('#left').css("display", "block");
    	$('#right').css("display", "block");
    	$('#neutral').css("display", "block");
    	$('#ideo-sep').css("display", "list-item");
    }
    else if (screenLen < 804 )
	{
    	//Navbar Items
    	
    	$('#advanced-search').css("display", "table")
    	$('#ideo-tabs').css("display", "none");
    	$('#quality-btns').css("display", "none");
    	
    	$('#top-nav-wrapper').css("height", 60);
    	
    	//Menu Items
    	
    	$('#legit').css("display", "block");
    	$('#fake').css("display", "block");
    	$('#quality-sep').css("display", "list-item");
    	$('#left').css("display", "block");
    	$('#right').css("display", "block");
    	$('#neutral').css("display", "block");
    	$('#ideo-sep').css("display", "list-item");
	}
    else if (screenLen < elemLen)
    {
    	//Navbar Items
    	
    	$('#advanced-search').css("display", "table")
    	$('#ideo-tabs').css("display", "initial");
    	$('#quality-btns').css("display", "none");
    	
    	$('#top-nav-wrapper').css("height", 60);
    	
    	//Menu Items
    	
    	$('#legit').css("display", "block");
    	$('#fake').css("display", "block");
    	$('#quality-sep').css("display", "list-item");
    	$('#left').css("display", "none");
    	$('#right').css("display", "none");
    	$('#neutral').css("display", "none");
    	$('#ideo-sep').css("display", "none");
    }
    else
	{
    	//Navbar Items
    	
    	$('#advanced-search').css("display", "table")
    	$('#ideo-tabs').css("display", "initial");
    	$('#quality-btns').css("display", "initial");
    	
    	$('#top-nav-wrapper').css("height", 60);
    	
    	//Menu Items
    	
    	$('#legit').css("display", "none");
    	$('#fake').css("display", "none");
    	$('#quality-sep').css("display", "none");
    	$('#left').css("display", "none");
    	$('#right').css("display", "none");
    	$('#neutral').css("display", "none");
    	$('#ideo-sep').css("display", "none");
	}
}
