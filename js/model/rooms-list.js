define('model/rooms-list', [
    'backbone',
    'underscore'
], function (
    BB,
    _
) {

    function RoomsList() {
        BB.Collection.apply(this, arguments);
    }

    BB.Collection.extend({
        constructor: RoomsList,
        model: Room,

        spread: function (rooms) {
            if (!_.isArray(rooms)) {
                rooms = [rooms];
            }

            var list = this;

            return rooms.map(function (room) {
                if (room.parent_id) {
                    room = list.get(room.parent_id).get('rooms').add(room);
                }
                else {
                    room = list.add(room);
                }

                return list._byId[room.get('id')] = room;
            });
        },

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
        },

        getRoomPath: function (room) {
            room = this.get(room);
            var list = [room];
            while (room.get('parent_id')) {
                room = this.get(room.get('parent_id'));
                list.push(room);
            }
            return list.reverse();
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
        },

        getPathUrl: function () {
            return 'rooms/' + this.get('id');
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