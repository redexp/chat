define('view/chat-list', [
    'view/chat',
    'view',
    'jquery'
], function (
    ChatView,
    View,
    $
) {

    function ChatListView() {
        View.apply(this, arguments);
    }

    View.extend({
        constructor: ChatListView,

        initialize: function () {
            var view = this;
            $(window).resize(function () {
                view.list.invoke('updateMessagesMaxHeight');
            });
        },

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