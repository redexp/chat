define('view/rooms-list', [
    'view',
    'router'
], function (
    View,
    router
) {

    function RoomsListView() {
        View.apply(this, arguments);
    }

    View.extend({
        constructor: RoomsListView,

        template: {
            'root': {
                each: {
                    view: RoomView,
                    el: function () {
                        return this.roomEl = this.ui.root.find('> *');
                    }
                },

                on: {
                    'click': {
                        'a[data-title]': function (e) {
                            e.preventDefault();
                            router.go(e.currentTarget.getAttribute('href'));
                        }
                    }
                }
            }
        }
    });

    function RoomView() {
        View.apply(this, arguments);
    }

    View.extend({
        constructor: RoomView,

        getRoomEl: function () {
            return this.parent.roomEl ? this.parent.roomEl : this.parent.getRoomEl();
        },

        template: {
            '[data-title]': {
                text: '@title',
                attr: {
                    'href': function () {
                        return 'rooms/' + this.model.get('id');
                    }
                }
            },

            '[data-sub-rooms-list]': {
                each: {
                    field: 'rooms',
                    view: RoomView,
                    el: function () {
                        return this.getRoomEl();
                    }
                }
            }
        }
    });

    return RoomsListView;
});