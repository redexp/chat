define('controller/chat', [
    'model/chat-list',
    'view/chat-list',
    'dispatcher',
    'jquery',
    'velocity'
], function (
    ChatList,
    ChatListView,
    dispatcher,
    $
) {

    var chatList = new ChatList([{}]);
    chatList.view = new ChatListView({
        el: '#chat',
        model: chatList
    });

    dispatcher.on('page:chat', function () {
        chatList.view.list.get(chatList.first()).ui.textarea.focus();
    });

    dispatcher.on('add-chat-message', function (chat, text) {
        if (/^\s*новая\s+тема/i.test(text)) {
            chat = addChat();
        }

        chat.get('messages').add({
            text: text
        });
    });

    function addChat(data) {
        data = data || {};

        var chat = chatList.add(data);
        $(this).css('display', 'none');
        var view = chatList.view.list.get(chat);
        view.$el
            .css({'border-left-width': 1})
            .velocity({'margin-left': 30}, {complete: function () {
                view.ui.textarea.focus();
            }})
        ;

        return chat;
    }
});