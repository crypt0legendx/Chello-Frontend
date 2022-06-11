// JavaScript Document
$(document).ready(function () {

	// Navigation Toggle Start
	$(".navbar-toggler").click(function (e) {
		$(this).toggleClass("open");
		e.preventDefault();
	});
	// Navigation Toggle End



	// Proximity List Items Carousel Start
	$('.price-slider').slick({
		dots: false,
		infinite: true,
		arrows: true,
		speed: 300,
		centerMode: true,
		centerPadding: '0',
		focusOnSelect: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		nextArrow: '<div class="slick-next slick-arrow"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="13.529px" height="21.403px" viewBox="0 0 13.529 21.403" enable-background="new 0 0 13.529 21.403" xml:space="preserve"><path fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M2,2l8.701,8.702L2,19.403"/></svg></div>',
		prevArrow: '<div class="slick-prev slick-arrow"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="13.529px" height="21.403px" viewBox="0 0 13.529 21.403" enable-background="new 0 0 13.529 21.403" xml:space="preserve"><path fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M11.529,19.403l-8.701-8.701L11.529,2"/></svg></div>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 0,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
	});

	// slick in tabing init start
	$('a[data-toggle="tab"]').on('show.bs.tab', function () {
		setTimeout(function () {
			$('.price-slider').slick('setPosition');
		}, 200);
	});
	// slick in tabing init end

	// tabing next click
	$('.next-btn').click(function () {
		$('.nav-tabs > .active').next('li').find('a').trigger('click');
	});
	// tabing next click

	// selectric 
	$('.selectric-select.default-select .form-control').selectric({
		disableonMobile: true,
		maxHeight: false
	});
	// selectric
	$('.scrollable .form-control').selectric({
		disableonMobile: true,
		// maxHeight: false
	});
	// selectric


	// Dropdown Value Change With Image Start
	$(".code-sel .dropdown-menu  a").click(function (e) {
		var img = $(this).children().attr("data-img");
		var selText = $(this).text();
		$(".code-sel .dropdown .dropdown-toggle").html("<img src=" + img + ">" + "<span>" + selText + "</span>");
		e.preventDefault();
	});
	// Dropdown Value Change With Image End
	
	// Dropdown Value Change With Image Start
	$(".code-sel .dropdown-menu  a").click(function (e) {
		var img = $(this).children().attr("data-img");
		var selText = $(this).text();
		$(".code-sel .dropdown .dropdown-toggle").html("<img src=" + img + ">" + "<span>" + selText + "</span>");
		e.preventDefault();
	});
	// Dropdown Value Change With Image End

	// Custome Scrollbar Start
	$(".message-scroll, .chat-list").mCustomScrollbar({
		axis: "y",
		autoHideScrollbar: false,
		mouseWheelPixels: 50,
		scrollInertia: 50,
		setLeft: 0
	});
	// Custome Scrollbar End

	//mobile message open
	$('.chat-list .person').click(function () {
		$('.message-list').toggleClass('open');
		$("body").addClass('overflow');
	});
	
	$('.message-list .back-btn').click(function () {
		$('.message-list').removeClass('open');
		$("body").removeClass('overflow');
	});
	//mobile message open
	
	// profile nav start
	$('.profile-toggle-btn a').click(function () {
		$('.profile-nav').slideToggle('open');
		$(this).toggleClass("open");
	});
	// profile nav start
	
	// $('.date-input').datepicker({
	// 	todayHighlight: true,
	// 	format: 'MM yyyy'
	// });
	// datepicker end
	
	// profile nav start
	$('.skill-search .selected-skill ul li .remove').click(function () {
		$(this).parent().parent().remove();
	});
	// profile nav start
	$(".show-modal").click(function(){
        $("#myModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    });


	// OFI Browser
	//objectFitImages();
});



/* Responsive Tabing Start */
(function ($) {
	'use strict';
	$(document).on('show.bs.tab', '.nav-tabs-responsive [data-toggle="tab"]', function (e) {
		var $target = $(e.target);
		var $tabs = $target.closest('.nav-tabs-responsive');
		var $current = $target.closest('li');
		var $parent = $current.closest('li.dropdown');
		$current = $parent.length > 0 ? $parent : $current;
		var $next = $current.next();
		var $prev = $current.prev();
		var updateDropdownMenu = function ($el, position) {
			$el
				.find('.dropdown-menu')
				.removeClass('pull-xs-left pull-xs-center pull-xs-right')
				.addClass('pull-xs-' + position);
		};

		$tabs.find('>li').removeClass('next prev active');
		$prev.addClass('prev');
		$next.addClass('next');
		$current.addClass("active");

		updateDropdownMenu($prev, 'left');
		updateDropdownMenu($current, 'center');
		updateDropdownMenu($next, 'right');
	});
})(jQuery);
/* Responsive Tabing End */