define('controller/login-form', [
    'dispatcher',
    'jquery'
], function (
    dispatcher,
    $
) {

    $(function () {
        $('#login-form [name="username"]').focus();
    });

    $('#login-form form').submit(function (e) {
        e.preventDefault();

        dispatcher.trigger('login');
    });
});