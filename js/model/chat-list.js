define('model/chat-list', [
    'model/chat',
    'backbone'
], function (
    Chat,
    BB
) {

    function ChatList() {
        BB.Collection.apply(this, arguments);
    }

    BB.Collection.extend({
        constructor: ChatList,
        model: Chat
    });

    return ChatList;
});