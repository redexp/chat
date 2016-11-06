define('controller/chat', [
    'store',
    'view/chat/chat-list',
    'dispatcher',
    'router',
    'pager',
    'velocity'
], function (
    store,
    ChatListView,
    dispatcher,
    router,
    pager
) {

    var chatList = store.Chat;
    chatList.view = new ChatListView({
        el: '#chat',
        model: chatList
    });

    chatList.add({});

    router.add('room', 'rooms/:id', function (id) {
        pager('chat');

        var room = store.Rooms.get(id);
        chatList.view.get('room_path').reset((function () {
            var list = [room];
            while (room.get('parent_id')) {
                room = store.Rooms.get(room.get('parent_id'));
                list.push(room);
            }
            return list.reverse();
        })());
    });

    dispatcher.on('add-chat-message', function (chat, text) {
        if (/^\s*(новая\s+тема|new)/i.test(text)) {
            chat = addChat();
        }

        chat.get('messages').add({
            text: text
        });
    });

    function addChat(data) {
        data = data || {};

        var width = chatList.view.$el.width(),
            last = chatList.view.list.get(chatList.last()),
            w = last.$el.width(),
            newW = (width - 30 * chatList.length) / (chatList.length + 1);

        last.$el.css({
            'flex-grow': 0,
            'width': w / 2
        });

        var chat = chatList.add(data),
            view = chatList.view.list.get(chat);

        view.$el.css({
            'flex-grow': 0,
            'width': w / 2,
            'border-left-width': 1
        });

        last.$el.velocity({'width': newW}, {complete: function () {
            last.$el.css({
                'flex-grow': 1,
                'width': ''
            });
        }});

        view.$el.velocity({'margin-left': 30, 'width': newW}, {complete: function () {
            view.$el.css({
                'flex-grow': 1,
                'width': ''
            });
        }});

        view.ui.textarea.focus();

        return chat;
    }
});