define('view/chat/chat', [
    'view',
    'view/chat/chat-message',
    'dispatcher'
], function (
    View,
    ChatMessageView,
    dispatcher
) {

    function ChatView() {
        View.apply(this, arguments);
    }

    View.extend({
        constructor: ChatView,

        ui: {
            messages: '[data-messages]',
            messages_scroller: '[data-messages-scroller]',
            textarea: '[data-chat-text]'
        },

        initialize: function () {
            this.once('added', this.updateMessagesMaxHeight);
        },

        scrollToBottom: function () {
            this.ui.messages_scroller.get(0).scrollTop = this.ui.messages_scroller.get(0).scrollHeight;
        },

        updateMessagesMaxHeight: function () {
            this.ui.messages.css('max-height', this.ui.messages_scroller.height());
        },

        addMessage: function () {
            var text = this.ui.textarea.val().trim();

            if (!text) return;

            dispatcher.trigger('add-chat-message', this.model, text);

            this.ui.textarea.val('');
            this.scrollToBottom();
        },

        template: {
            'messages': {
                each: {
                    field: 'messages',
                    view: ChatMessageView,
                    el: '> *'
                }
            },

            'textarea': {
                on: {
                    'keydown': function (e) {
                        switch (e.keyCode) {
                        case 13:
                            if (e.ctrlKey) {
                                break;
                            }

                            e.preventDefault();
                            this.addMessage();
                            break;
                        }
                    },
                    'keyup': function (e) {
                        switch (e.keyCode) {
                        case 13:
                            if (e.ctrlKey) {
                                this.ui.textarea.get(0).value += '\n';
                            }
                            break;
                        }
                    }
                }
            }
        }
    });

    return ChatView;
});