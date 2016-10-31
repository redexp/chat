define('dispatcher', [
    'backbone',
    'underscore'
], function (
    BB,
    _
) {

    return _.clone(BB.Events);
});