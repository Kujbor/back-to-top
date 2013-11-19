/*
 * jquery.backtotop.js - very cool Back-to-top button
 * Author Oleg Taranov aka Kujbor
 * Copyright (C) 2013: CubeComp Development
 */
define("jquery.backtotop", ["jquery"], function($) {

    "use strict";

    $.fn.backToTop = function(contentBoxIdentifer) {

        var $body = $("body");
        var $container = $(contentBoxIdentifer);
        var $block = $(this);
        var $button = $block.find("a");
        var $window = $(window);
        var doc = document;
        var savedScroll = 0;

        function getScroll() {

            return self.pageYOffset ||
                    (doc.documentElement && doc.documentElement.scrollTop) ||
                    (doc.body && doc.body.scrollTop);
        }

        function updateButton() {

            var offset = ($body.outerWidth() - $container.outerWidth()) / 2;
            var top = getScroll();

            if (offset < 90) {

                if (offset > 40) {

                    $block.width(40);
                    $button.text("");

                    if (top > 100) {

                        $button.css("background-position", "left 3px");
                        $block.show();

                    } else if (savedScroll) {

                        $button.css("background-position", "left -7px");
                        $block.show();

                    } else {
                        $block.hide();
                    }

                } else {
                    $block.hide();
                }

            } else {

                $block.width(90);

                if (top > 100) {

                    $button.text("Up");
                    $button.css("background-position", "left 3px");
                    $block.show();

                } else if (savedScroll) {

                    $button.text("Down");
                    $button.css("background-position", "left -7px");
                    $block.show();

                } else {
                    $block.hide();
                }
            }
        }

        $window.on("load resize scroll click", updateButton);

        $block.on("click", function(event) {

            if (getScroll() > 100) {

                savedScroll = getScroll();
                $("body,html").scrollTop(0);

            } else if (savedScroll) {
                $("body,html").scrollTop(savedScroll);
            }

            if (event.preventDefault) {
                event.preventDefault();
            }

            event.returnValue = false;
        });
    };
});
