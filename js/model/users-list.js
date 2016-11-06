define('model/users-list', [
    'backbone'
], function (
    BB
) {

    function UsersList() {
        BB.Collection.apply(this, arguments);
    }

    BB.Collection.extend({
        constructor: UsersList,

        model: User,

        hideUsersByName: function (name) {
            name = name.trim().toLowerCase();

            if (!name) {
                this.invoke('set', 'hidden', false);
                return;
            }

            this.forEach(function (user) {
                user.set('hidden', user.get('name').toLowerCase().indexOf(name) === -1);
            });
        }
    });

    function User() {
        BB.Model.apply(this, arguments);
    }

    BB.Model.extend({
        constructor: User,

        defaults: function () {
            return {
                name: '',
                hidden: false
            };
        }
    });

    return UsersList;
});