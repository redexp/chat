define('view/chat-message', [
    'view'
], function (
    View
) {

    function ChatMessageView() {
        View.apply(this, arguments);
    }

    View.extend({
        constructor: ChatMessageView,

        template: {
            '[data-message-text]': {
                text: '=text'
            }
        }
    });

    return ChatMessageView;
});