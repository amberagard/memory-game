(function() {
    'use strict';

    $(document).ready(initialize);

    var random;
    var timer;
    var countdown;

    function initialize() {
        $('.start').click(load);
        $('.card').click(selectCard);
    }

    function load() {
        randomNum();
        clearInterval(timer);
        countdown = $('#countdown').data('time') * 1;
        timer = setInterval(updateClock, 1000);
        reset();
    }

    function updateClock() {
        countdown--;
        $('#countdown').text(countdown);

        if(countdown > 0 && countdown < 10) {
            warning();
        } else if(!countdown) {
            gameOver();
        }
    }

    function warning() {
        $('#countdown').css('font-size', '50px');
        $('#countdown').css('color', 'red');
    }

    function reset() {
        $('.flipper').removeClass('removed selected rotate');
        $('#countdown').css('font-size', '30px');
        $('#countdown').css('color', 'black');
    }

    function randomNum() {
        random = [];
        for(var i = 0; i < 2; i++) {
            for(var j = 1; j < 11; j++) {
                random.push(j);
            }
        }

        random.sort(function() {
            return 0.5 - Math.random();
        });
        window.random = random;
    }

    function selectCard() {
        var $cards = $('.card');
        var index = $cards.index($(this));
        $(this).find('.front').css('background-image', 'url(./media/' + random[index] + '.png)');

        if($('.selected').length < 2) {
            $(this).find('.flipper').addClass('rotate').addClass('selected');
            if($('.selected').length === 2) {
                setTimeout(checkPattern, 1400);
            }
        }
    }

    function checkPattern() {
        var $selected = $('.selected');
        if(isMatchPattern()) {
            $selected.removeClass('selected').addClass('removed');
            if ($('.removed').length === 20) {
                gameOver();
            }
        } else {
            $selected.removeClass('rotate').removeClass('selected');
            setTimeout(function() {
                $selected.find('.front').css('background-image', '');
            }, 1000);
        }
    }

    function isMatchPattern() {
        var $cards = $('.selected > .front');
        var pattern1 = $cards.eq(0).css('background-image');
        var pattern2 = $cards.eq(1).css('background-image');
        console.log(pattern1, pattern2);
        return (pattern1 === pattern2);
    }

    function gameOver() {
        alert('Game Over');
        clearInterval(timer);
    }

})();
