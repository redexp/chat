define('model/rooms-list', [
    'backbone'
], function (
    BB
) {

    function RoomsList() {
        BB.Collection.apply(this, arguments);
    }

    BB.Collection.extend({
        constructor: RoomsList,
        model: Room,

        hideRoomsByPath: function (path) {
            if (typeof path === 'string') {
                path = path.trim().split('/');
            }

            if (path.length === 0 || (path.length === 1 && !path[0])) {
                this.showAll();
                return;
            }

            path = path.map(function (item) {
                return item.toLowerCase();
            });

            toggleHidden(this, path, 0);
        },

        showAll: function () {
            this.invoke('showDeep');
        }
    });

    function Room() {
        BB.Model.apply(this, arguments);
    }

    BB.Model.extend({
        constructor: Room,

        defaults: function () {
            return {
                title: '',
                rooms: new RoomsList(),
                hidden: false
            };
        },

        showDeep: function () {
            this.set('hidden', false);
            this.get('rooms').showAll();
        }
    });

    function toggleHidden(rooms, path, index) {
        if (index >= path.length) return;

        rooms.forEach(function (room) {
            room.set('hidden', room.get('title').toLowerCase().indexOf(path[index]) !== 0);

            if (!room.get('hidden')) {
                toggleHidden(room.get('rooms'), path, index + 1);
            }
        });
    }

    return RoomsList;
});