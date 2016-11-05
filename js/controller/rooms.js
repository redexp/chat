define('controller/rooms', [
    'store',
    'view/rooms-list',
    'router',
    'pager',
    'dispatcher'
], function (
    store,
    RoomsListView,
    router,
    pager,
    dispatcher
) {

    var rooms = store.Rooms;
    rooms.view = new RoomsListView({
        el: '#rooms [data-rooms-list]',
        model: rooms
    });

    rooms.add({id: 1, title: 'First project'}).get('rooms').add([{id: 11, title: 'Developers'}, {id: 12, title: 'Designers'}]);
    rooms.add({id: 2, title: 'Second project'}).get('rooms').add([{id: 21, title: 'Testers'}, {id: 22, title: 'Stuff'}]);

    router.add('rooms', function () {
        pager('rooms');
    });

    dispatcher.on('login', function () {
        router.go('rooms');
    });
});