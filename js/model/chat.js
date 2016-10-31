define('model/chat', [
    'backbone'
], function (
    BB
) {

    function Chat() {
        BB.Model.apply(this, arguments);
    }

    BB.Model.extend({
        constructor: Chat,
        
        defaults: function () {
            return {
                messages: new BB.Collection(),
                text: '',
                users: new BB.Collection()
            };
        }
    });

    return Chat;
});