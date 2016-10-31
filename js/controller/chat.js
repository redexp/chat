define('controller/chat', [
    'model/chat',
    'view/chat',
    'dispatcher'
], function (
    Chat,
    ChatView,
    dispatcher
) {

    var chat = new Chat();
    chat.view = new ChatView({
        el: '#chat',
        model: chat
    });

    dispatcher.on('add-chat-message', function (chat, text) {
        chat.get('messages').add({
            text: text
        });
    });
});