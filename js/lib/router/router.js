define('router', [
    'backbone'
], function (
    BB
) {

    var router = new BB.Router();

    router.routes = {};

    router.add = function (name, route, cb) {
        if (arguments.length === 2) {
            cb = route;
            route = name;
            name = route.match(/\w+/)[0];
        }

        router.route(route, name, cb);

        router.routes[name] = route;

        return this;
    };

    router.go = function (name) {
        var route = router.routes[name] || name;

        router.navigate(route, {trigger: true});

        return this;
    };

    router.start = function (ops) {
        BB.history.start(ops);

        return this;
    };

    return router;
});