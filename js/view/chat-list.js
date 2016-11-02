define('view/chat-list', [
    'view/chat',
    'view'
], function (
    ChatView,
    View
) {

    function ChatListView() {
        View.apply(this, arguments);
    }

    View.extend({
        constructor: ChatListView,

        template: {
            '[data-chat-list]': {
                each: {
                    view: ChatView,
                    el: '> *',
                    viewProp: 'list'
                }
            }
        }
    });

    return ChatListView;
});