;(function () {

    /** @global */
    var window = typeof exports === 'object' ? exports : this;

    define.v = '1.9.1';

    window.define = define;
    window.require = require;

    define.amd = {
        jQuery: true
    };

    define.clear = clear;
    define.end = end;

    require.config = function () {};
    require.specified = specified;

    var modules, names, pending;

    clear();

    /**
     * @global
     * @param {String|Array|Function} name
     * @param {Array|Function} deps
     * @param {Function} cb
     */
    function define(name, deps, cb) {
        if (arguments.length === 1) {
            switch (typeof name) {
                case 'string':
                    nextName(name);
                    return;

                case 'function':
                    cb = name;
                    name = nextName();
                    deps = ['require', 'exports', 'module'];
                    break;

                case 'object':
                    var result = name;
                    name = nextName();
                    deps = [];
                    cb = function () {
                        return result;
                    };
                    break;

                default:
                    throw new Error('Unknown one argument type: ' + typeof name);
            }
        }
        else if (arguments.length === 2) {
            cb = deps;
            deps = name;
            name = nextName();
        }
        else if (names.length > 0) {
            name = nextName();
        }

        if (typeof name !== 'string') {
            throw new Error('Invalid module name type: ' + typeof name);
        }

        if (specified(name)) {
            throw new Error('Module already defined: ' + name);
        }

        modules[name] = {
            callback: typeof cb === 'function' ? cb : function () {
                return cb;
            },
            deps: deps,
            called: false,
            pending: false,
            result: null
        };

        if (pending[name]) {
            pending[name].forEach(function (item) {
                require(item.deps, item.cb);
            });

            delete pending[name];
        }
    }

    /**
     * @global
     * @param {String|Array} deps
     * @param {Function} cb
     */
    function require(deps, cb) {
        if (arguments.length === 1) {
            switch (typeof deps) {
                case 'string':
                    return moduleResult(deps);

                case 'object':
                    cb = function () {};
                    break;
            }
        }

        var name = getFirstDeepUnspecified(deps);
        if (name) {
            if (!pending[name]) pending[name] = [];
            pending[name].push({
                cb: cb,
                deps: deps
            });

            return;
        }

        cb.apply(null, deps.map(moduleResult));
    }

    function moduleResult(name) {
        if (typeof name !== 'string') return name;

        switch (name) {
            case 'require':
                return require;
        }

        if (!specified(name)) {
            throw new Error('Undefined module: ' + name);
        }

        var module = modules[name];

        if (module.called) {
            return module.result;
        }

        if (module.pending) return;

        module.pending = true;

        var moduleExports = {exports: {}},
            hasModuleExports = false;

        var exportsIndex = module.deps.indexOf('exports');
        if (exportsIndex > -1) {
            hasModuleExports = true;
            module.deps.splice(exportsIndex, 1, moduleExports.exports);
        }

        var moduleIndex = module.deps.indexOf('module');
        if (moduleIndex > -1) {
            hasModuleExports = true;
            module.deps.splice(moduleIndex, 1, moduleExports);
        }

        var result = module.callback.apply(null, module.deps.map(moduleResult));

        module.result = typeof result !== 'undefined' ? result : (hasModuleExports ? moduleExports.exports : result);

        module.called = true;
        module.pending = false;

        module.deps = null;
        module.callback = null;

        return module.result;
    }

    function nextName(name) {
        if (name && specified(name)) {
            throw new Error('Module already defined: ' + name);
        }

        return name ? names.push(name) : names.shift();
    }

    function clear() {
        modules = define.modules = {
            'require': {
                called: true,
                result: require,
                deps: []
            },
            'exports': {
                called: true,
                result: null,
                deps: []
            },
            'module': {
                called: true,
                result: null,
                deps: []
            }
        };
        names = define.names = [];
        pending = define.pending = {};
        end.called = false;
    }

    function specified(names) {
        return !unspecified(names);
    }

    function unspecified(names) {
        if (typeof names === 'string') {
            return has(modules, names) ? false : names;
        }

        var name;
        for (var i = 0, len = names.length; i < len; i++) {
            name = names[i];
            if (!has(modules, name)) return name;
        }

        return false;
    }

    function getFirstDeepUnspecified(names) {
        var name = unspecified(names);
        if (name) return name;

        var module;
        for (var i = 0, len = names.length; i < len; i++) {
            module = modules[names[i]];
            if (module.called) continue;
            name = getFirstDeepUnspecified(module.deps);
            if (name) return name;
        }

        return false;
    }

    function end() {
        end.called = true;

        for (var name in pending) {
            if (!has(pending, name)) continue;
            throw new Error('Undefined module: ' + name);
        }
    }

    function has(obj, field) {
        return obj && Object.prototype.hasOwnProperty.call(obj, field);
    }

}());