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

        $block.getScroll = function() {

            return self.pageYOffset ||
                    (doc.documentElement && doc.documentElement.scrollTop) ||
                    (doc.body && doc.body.scrollTop);
        };

        $block.updateButton = function() {

            var offset = ($body.outerWidth() - $container.outerWidth()) / 2;
            var top = $block.getScroll();

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

                    $button.text("Вверх");
                    $button.css("background-position", "left 3px");
                    $block.show();

                } else if (savedScroll) {

                    $button.text("Вниз");
                    $button.css("background-position", "left -7px");
                    $block.show();

                } else {
                    $block.hide();
                }
            }
        };

        $block.reset = function() {
            $("body,html").scrollTop(0);
            savedScroll = null;
            $block.updateButton();
        };

        $window.on("load resize scroll click", $block.updateButton);

        $block.on("click", function(event) {

            if ($block.getScroll() > 100) {

                savedScroll = $block.getScroll();
                $("body,html").scrollTop(0);

            } else if (savedScroll) {
                $("body,html").scrollTop(savedScroll);
            }

            event.preventDefault();
        });

        return $block;
    };
});
