define('view/rooms/rooms-toolbar', [
    'view',
    'dispatcher',
    'underscore'
], function (
    View,
    dispatcher,
    _
) {

    function RoomsToolbar() {
        View.apply(this, arguments);
    }

    View.extend({
        constructor: RoomsToolbar,

        ui: {
            search: '[data-search]'
        },

        defaults: function () {
            return {
                prev_search: '',
                search_hint: ''
            };
        },

        filterRooms: function () {
            var search = this.ui.search.val().trim();

            if (search === this.get('prev_search')) return;

            this.set('prev_search', search);

            dispatcher.trigger('filter-rooms', search);
        },

        template: {
            'search': {
                on: {
                    'keyup': _.debounce(function () {
                        this.filterRooms();
                    }, 100)
                }
            },

            '[data-search-hint]': {
                text: '@search_hint'
            }
        }
    });

    return RoomsToolbar;
});