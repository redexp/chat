define('view/chat/chat-list', [
    'view/chat/chat',
    'view',
    'backbone',
    'jquery'
], function (
    ChatView,
    View,
    BB,
    $
) {

    function ChatListView() {
        View.apply(this, arguments);
    }

    View.extend({
        constructor: ChatListView,

        defaults: function () {
            return {
                room_path: new BB.Collection()
            };
        },

        initialize: function () {
            var view = this;
            $(window).resize(function () {
                view.updateMessagesMaxHeight();
            });
        },

        updateMessagesMaxHeight: function () {
            this.list.invoke('updateMessagesMaxHeight');
        },

        focus: function () {
            this.list.get(this.model.first()).ui.textarea.focus();
        },

        template: {
            '[data-room-path]': {
                each: {
                    field: 'room_path',
                    view: RoomPathView,
                    el: '> *:nth-child(2)',
                }
            },

            '[data-chat-list]': {
                each: {
                    view: ChatView,
                    el: '> *',
                    viewProp: 'list'
                }
            }
        }
    });

    function RoomPathView() {
        View.apply(this, arguments);
    }

    View.extend({
        constructor: RoomPathView,

        template: {
            '[data-room-title]': {
                text: '@title',
                attr: {
                    'href': function () {
                        return '#' + this.model.getPathUrl();
                    }
                }
            }
        }
    });

    return ChatListView;
});