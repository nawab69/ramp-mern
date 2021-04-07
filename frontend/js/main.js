/*---------------------------------------------
Template name:  Bitcon - Bitcoin HTML5 Template
Version:        3.0
Author:         TechyDevs
Author Email:   contact@techydevs.com

[Table of Content]

01: Preloader
02: Mobile Menu
03: Dropdown menu
04: Back to Top Button and Navbar fixed
05: back to top button animate
06: Back to Top Button
07: Fancybox
08: Counter up
09: Client logo
10: Client logo 2
11: client-testimonial
13: Service carousel
14: bootstrap tooltip
15: Chosen select
16: Quantity
17: Simply countdown
18: Google Maps
----------------------------------------------*/

(function ($) {
    "use strict";

    var $window = $(window);

    $window.on('load', function () {

        var $document = $(document);
        var $dom = $('html, body');
        var isMenuOpen = false;
        var preLoader = $('.loader-container');
        var headerMenuWrapper = $('.header-menu-wrapper');
        var dropdownMenu = $('.main-nav .drop-menu');
        var backToTopBtn = $('#scroll-to-top');
        var numberCounter = $('.counter');
        var clientLogo = $('.client-logo-carousel');
        var clientLogoTwo = $('.client-logo-carousel-2');
        var clientTestimonial = $('.client-testimonial');
        var serviceCarousel = $('.service-carousel');
        var bootstrapTooltip = $('[data-toggle="tooltip"]');
        var fancyBox = $('[data-fancybox]');
        var userChosenSelect = $('.user-chosen-select');
        var simpleCountdownTimer = $('.simply-countdown');

        /*==== Preloader =====*/
        preLoader.delay('500').fadeOut(2000);

        /*=========== Mobile Menu ============*/
        $document.on('click', '.hamburger', function () {
            $(this).toggleClass('is-active');
            $('.main-nav').slideToggle();
        });

        /*=========== Dropdown menu ============*/
        dropdownMenu.parent('li').children('a').append(function() {
            return '<span class="drop-menu-toggle"><i class="la la-plus"></i></span>';
        });

        /*=========== Dropdown menu ============*/
        $document.on('click', '.drop-menu-toggle', function() {
            var Self = $(this);
            Self.toggleClass('active');
            Self.parent().parent().siblings().children('a').find('.drop-menu-toggle').removeClass('active');
            Self.parent().parent().children('.drop-menu').slideToggle();
            Self.parent().parent().siblings().children('.drop-menu').slideUp();
            return false;
        });

        /*=========== When window will resize then this action will work ============*/
        $window.on('resize', function () {
            if ($window.width() > 991) {
                $('.main-nav').show();
                $('.drop-menu').show();
            }else {
                if (isMenuOpen) {
                    $('.main-nav').show();
                    $('.drop-menu').show();
                }else {
                    $('.main-nav').hide();
                    $('.drop-menu').hide();
                }
            }
        });

        /*===== Back to Top Button and Navbar fixed ======*/
        $window.on('scroll', function() {
            //header fixed
            if($window.scrollTop() > 100) {
                $(headerMenuWrapper).addClass('header-fixed');
            }else{
                $(headerMenuWrapper).removeClass('header-fixed');
            }

            //back to top button
            if ($window.scrollTop() > 300) {
                $(backToTopBtn).addClass('is-active');
            } else {
                $(backToTopBtn).removeClass('is-active');
            }
        });

        /*===== back to top button animate ======*/
        $document.on('click', '#scroll-to-top', function() {
            $($dom).animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        /*==== Fancybox =====*/
        if ($(fancyBox).length) {
            $(fancyBox).fancybox();
        }

        /*==== Counter up =====*/
        if ($(numberCounter).length) {
            $(numberCounter).counterUp({
                delay: 20,
                time: 2000
            });
        }

        /*==== Client logo =====*/
        if ($(clientLogo).length) {
            $(clientLogo).owlCarousel({
                loop: true,
                items: 5,
                nav: false,
                dots: false,
                smartSpeed: 500,
                autoplay: true,
                responsive : {
                    // breakpoint from 0 up
                    0 : {
                        items: 1
                    },
                    // breakpoint from 480 up
                    480 : {
                        items: 2
                    },
                    // breakpoint from 768 up
                    991 : {
                        items: 3
                    },
                    // breakpoint from 1280 up
                    1280 : {
                        items: 5
                    }
                }
            });
        }

        /*==== Client logo 2 =====*/
        if ($(clientLogoTwo).length) {
            $(clientLogoTwo).owlCarousel({
                loop: true,
                items: 4,
                nav: false,
                dots: false,
                smartSpeed: 500,
                autoplay: true,
                responsive : {
                    // breakpoint from 0 up
                    320 : {
                        items: 2
                    },
                    // breakpoint from 481 up
                    481 : {
                        items: 3
                    },
                    // breakpoint from 768 up
                    768 : {
                        items: 4
                    }
                }
            });
        }

        /*==== client-testimonial =====*/
        if ($(clientTestimonial).length) {
            $(clientTestimonial).owlCarousel({
                loop: true,
                items: 1,
                nav: false,
                dots: true,
                smartSpeed: 500,
                autoplay: false
            });
        }

        /*==== Service carousel =====*/
        if ($(serviceCarousel).length) {
            $(serviceCarousel).owlCarousel({
                loop: true,
                items: 3,
                nav: false,
                dots: true,
                smartSpeed: 700,
                autoplay: false,
                margin: 30,
                responsive : {
                    // breakpoint from 0 up
                    0 : {
                        items: 1
                    },
                    // breakpoint from 480 up
                    600 : {
                        items: 1
                    },
                    // breakpoint from 992 up
                    992 : {
                        items: 3
                    }
                }
            });
        }

        /*==== Bootstrap tooltip =====*/
        if ($(bootstrapTooltip).length) {
            $(bootstrapTooltip).tooltip();
        }

        /*==== Chosen select =====*/
        if ($(userChosenSelect).length) {
            $(userChosenSelect).chosen({
                no_results_text: "Oops, nothing found!",
                allow_single_deselect: true
            });
        }

        $(userChosenSelect).on('chosen:showing_dropdown', function(event, params) {
            var chosen_container = $( event.target ).next( '.chosen-container' );
            var dropdown = chosen_container.find( '.chosen-drop' );
            var dropdown_top = dropdown.offset().top - $(window).scrollTop();
            var dropdown_height = dropdown.height();
            var viewport_height = $(window).height();

            if ( dropdown_top + dropdown_height > viewport_height ) {
                chosen_container.addClass( 'chosen-drop-up' );
            }
        });

        $(userChosenSelect).on('chosen:hiding_dropdown', function(event, params) {
            $( event.target ).next( '.chosen-container' ).removeClass( 'chosen-drop-up' );
        });

        /*======== Quantity =========*/
        $document.on("click", ".qtyDec, .qtyInc", function() {

            var $button = $(this);
            var oldValue = $button.parent().find("input").val();

            if ($button.hasClass('qtyInc')) {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                // don't allow decrementing below zero
                if (oldValue > 0) {
                    var newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 0;
                }
            }

            $button.parent().find("input").val(newVal);
        });

        /*====== Simple countdown =====*/
        if($(simpleCountdownTimer).length) {
            $(simpleCountdownTimer).simplyCountdown({
                year: 2021, // required
                month: 12, // required
                day: 28, // required
            })
        }

    });

})(jQuery);

