define('store', [
    'model/rooms-list',
    'model/users-list',
    'model/chat-list',
    'backbone'
], function (
    RoomsList,
    UsersList,
    ChatList,
    BB
) {

    var store = {};

    store.Rooms = new RoomsList();
    store.Users = new UsersList();
    store.Chat = new ChatList();

    store.Rooms.add({id: 1, title: 'First project'}).get('rooms').add([{id: 11, title: 'Developers'}, {id: 12, title: 'Designers'}]);
    store.Rooms.add({id: 2, title: 'Second project'}).get('rooms').add([{id: 21, title: 'Testers'}, {id: 22, title: 'Stuff'}]);

    store.Users.add([{id: 1, name: 'Sergii'}, {id: 2, name: 'Max'}]);

    return store;
});