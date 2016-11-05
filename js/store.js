define('store', [
    'model/rooms-list',
    'model/chat-list',
    'backbone'
], function (
    RoomsList,
    ChatList,
    BB
) {

    var store = {};

    store.Rooms = new RoomsList();
    store.Chat = new ChatList();

    return store;
});