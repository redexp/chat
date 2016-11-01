define('pages', ['dispatcher', 'jquery', 'velocity'], function (dispatcher, $) {

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

        if (pIndex === aIndex) return;

        page.css('display', 'none');
        active.css('display', 'block');

        page.velocity(effects[direction][0], {duration: 300, display: 'block', begin: removeActivePage});
        active.velocity(effects[direction][1], {duration: 300, display: 'none', complete: setActivePage});

        function removeActivePage() {
            active.removeClass('active-page');
        }

        function setActivePage() {
            page.addClass('active-page').css('transform', '');
            dispatcher.trigger('page:' + page.attr('id'));
        }

        return page;
    }

    return goToPage;
});