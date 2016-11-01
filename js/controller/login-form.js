define('controller/login-form', [
    'pages',
    'jquery'
], function (
    pages,
    $
) {

    $('#login-form [name="username"]').focus();

    $('#login-form form').submit(function (e) {
        e.preventDefault();

        pages('chat');
    });
});