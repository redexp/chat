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

    store.Rooms.spread([
        {id: 1,  parent_id: null, title: 'First project'},
        {id: 11, parent_id: 1, title: 'Developers'},
        {id: 12, parent_id: 1, title: 'Designers'},
        {id: 2,  parent_id: null, title: 'Second project'},
        {id: 21, parent_id: 2, title: 'Testers'},
        {id: 22, parent_id: 2, title: 'Stuff'}
    ]);

    store.Users.reset([
        {id: 1, name: 'Sergii'},
        {id: 2, name: 'Max'}
    ]);

    return store;
});