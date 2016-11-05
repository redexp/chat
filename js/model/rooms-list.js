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
        model: Room
    });

    function Room() {
        BB.Model.apply(this, arguments);
    }

    BB.Model.extend({
        constructor: Room,

        defaults: function () {
            return {
                title: '',
                rooms: new RoomsList()
            };
        }
    });

    return RoomsList;
});