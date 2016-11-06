define('controller/rooms', [
    'store',
    'view/rooms/rooms-toolbar',
    'view/rooms/rooms-list',
    'view/rooms/users-rooms-list',
    'router',
    'pager',
    'dispatcher'
], function (
    store,
    RoomsToolbar,
    RoomsListView,
    UsersRoomsListView,
    router,
    pager,
    dispatcher
) {

    var toolbar = new RoomsToolbar({
        el: '#rooms [data-rooms-toolbar]'
    });

    var rooms = store.Rooms;
    rooms.view = new RoomsListView({
        el: '#rooms [data-rooms-list]',
        model: rooms
    });

    var users = store.Users;
    users.view = new UsersRoomsListView({
        el: '#rooms [data-users-rooms-list]',
        model: users
    });

    toolbar.set('search_hint', (function () {
        var list = [],
            room = rooms.first();

        while (room) {
            list.push(room.get('title').slice(0, 3).toLowerCase());
            room = room.get('rooms').first();
        }

        return list.join('/');
    })());

    router.add('rooms', function () {
        pager('rooms');
    });

    dispatcher.on('login', function () {
        router.go('rooms');
    });

    dispatcher.on('filter-rooms', function (search) {
        rooms.hideRoomsByPath(search);
        users.hideUsersByName(search);
    });
});