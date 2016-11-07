define('pager', ['dispatcher', 'jquery', 'velocity'], function (dispatcher, $) {

    var effects = {
        next: [
            {opacity: [1, 0], translateY: [0, 20], translateZ: 0},
            {opacity: [0, 1], translateY: -20, translateZ: 0}
        ],
        prev: [
            {opacity: [1, 0], translateY: [0, -20], translateZ: 0},
            {opacity: [0, 1], translateY: 20, translateZ: 0}
        ]
    };

    function goToPage(page) {
        page = $('#' + page);

        var active = page.parent().find('> .active-page'),
            pIndex = page.index(),
            aIndex = active.index(),
            direction = pIndex > aIndex ? 'next' : 'prev';

        if (active.length === 0) {
            triggerActivePage();
            setActivePage();
            return;
        }

        if (pIndex === aIndex) return;

        page.css('display', 'none');
        active.css('display', 'block');

        page.velocity(effects[direction][0], {duration: 300, display: 'block', begin: removeActivePage});
        active.velocity(effects[direction][1], {duration: 300, display: 'none', begin: triggerActivePage, complete: setActivePage});

        function removeActivePage() {
            active.removeClass('active-page');
        }

        function triggerActivePage() {
            var timer = setInterval(function () {
                if (page.css('display') === 'block') {
                    clearInterval(timer);
                    dispatcher.trigger('page:' + page.attr('id'));
                }
            }, 20);
        }

        function setActivePage() {
            page.addClass('active-page').css('transform', '');
        }

        return page;
    }

    return goToPage;
});