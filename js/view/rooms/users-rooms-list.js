define('view/rooms/users-rooms-list', [
    'view'
], function (
    View
) {

    function UsersRoomsListView() {
        View.apply(this, arguments);
    }

    View.extend({
        constructor: UsersRoomsListView,

        template: {
            'root': {
                each: {
                    view: UserRoomView,
                    el: '> *'
                }
            }
        }
    });

    function UserRoomView() {
        View.apply(this, arguments);
    }

    View.extend({
        constructor: UserRoomView,

        template: {
            'root': {
                'class': {
                    'hidden': '@hidden'
                }
            },

            '[data-title]': {
                text: '@name',
                attr: {
                    'href': function () {
                        return '#user-room/' + this.model.get('id')
                    }
                }
            }
        }
    });

    return UsersRoomsListView;
});