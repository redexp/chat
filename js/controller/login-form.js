define('controller/login-form', [
    'dispatcher',
    'router',
    'pager',
    'jquery'
], function (
    dispatcher,
    router,
    pager,
    $
) {

    router.add('login', '', function () {
        pager('login-form');
        $('#login-form [name="username"]').focus();
    });

    $('#login-form form').submit(function (e) {
        e.preventDefault();

        dispatcher.trigger('login');
    });
});