'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DispatcherProxy = exports.Dispatcher = undefined;

var _metadata = require('./metadata');

var _utils = require('./utils');

var _fluxDispatcher = require('./flux-dispatcher');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _symbols = require('./symbols');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Handler = function Handler(regexp, handler) {
    _classCallCheck(this, Handler);

    this.regexp = regexp;
    this.function = handler;
};

var Dispatcher = exports.Dispatcher = function () {
    function Dispatcher(instance) {
        _classCallCheck(this, Dispatcher);

        this.instance = instance;
        this.handlers = new Set();

        _fluxDispatcher.FluxDispatcher.instance.registerInstanceDispatcher(this);
    }

    Dispatcher.prototype.handle = function handle(patterns, callback) {
        var _this = this;

        var handler = new Handler(_utils.Utils.patternsToRegex(patterns), callback);
        this.handlers.add(handler);

        return function () {
            _this.handlers.delete(handler);
        };
    };

    Dispatcher.prototype.waitFor = function waitFor(types, handler) {
        _fluxDispatcher.FluxDispatcher.instance.waitFor(types, handler);
    };

    Dispatcher.prototype.dispatch = function dispatch(action) {
        for (var _len = arguments.length, payload = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            payload[_key - 1] = arguments[_key];
        }

        _fluxDispatcher.FluxDispatcher.instance.dispatch(action, payload);
    };

    Dispatcher.prototype.dispatchOwn = function dispatchOwn(action, payload) {
        var _this2 = this;

        var promises = [];

        this.handlers.forEach(function (handler) {
            if (handler.regexp.test(action)) {
                promises.push(_bluebird2.default.resolve(handler.function.apply(_this2.instance, [action].concat(payload))));
            }
        });

        return _bluebird2.default.all(promises.map(function (promise) {
            return promise.reflect();
        }));
    };

    Dispatcher.prototype.registerMetadata = function registerMetadata() {
        var _this3 = this;

        var metadata = _metadata.Metadata.getOrCreateMetadata(Object.getPrototypeOf(this.instance));

        metadata.awaiters.forEach(function (types, methodName) {
            if (_this3.instance[methodName] !== undefined && typeof _this3.instance[methodName] === 'function') {
                var methodImpl = _this3.instance[methodName];
                _this3.instance[methodName] = function () {
                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        args[_key2] = arguments[_key2];
                    }

                    return _fluxDispatcher.FluxDispatcher.instance.waitFor(types, function () {
                        methodImpl.apply(_this3.instance, args);
                    });
                };
            }
        });

        metadata.handlers.forEach(function (patterns, methodName) {
            if (_this3.instance[methodName] !== undefined && typeof _this3.instance[methodName] === 'function') {
                _this3.handlers.add(new Handler(_utils.Utils.patternsToRegex(patterns), _this3.instance[methodName]));
            }
        });
    };

    return Dispatcher;
}();

var DispatcherProxy = exports.DispatcherProxy = function () {
    function DispatcherProxy(instancePromise) {
        var _this4 = this;

        _classCallCheck(this, DispatcherProxy);

        this.inititalize = _bluebird2.default.resolve(instancePromise).then(function (instance) {
            _this4.instance = instance;
        });
    }

    DispatcherProxy.prototype.handle = function handle(patterns, handler) {
        var _this5 = this;

        var def = _bluebird2.default.defer();

        this.inititalize.then(function () {
            def.resolve(_this5.instance[_symbols.Symbols.instanceDispatcher].handle(patterns, handler));
        });

        return function () {
            def.promise.then(function (unregister) {
                return unregister();
            });
        };
    };

    DispatcherProxy.prototype.waitFor = function waitFor(types, handler) {
        var _this6 = this;

        this.inititalize.then(function () {
            _this6.instance[_symbols.Symbols.instanceDispatcher].waitFor(types, handler);
        });
    };

    DispatcherProxy.prototype.dispatch = function dispatch(action) {
        var _this7 = this;

        for (var _len3 = arguments.length, payload = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            payload[_key3 - 1] = arguments[_key3];
        }

        this.inititalize.then(function () {
            _this7.instance[_symbols.Symbols.instanceDispatcher].dispatch.apply(_this7.instance[_symbols.Symbols.instanceDispatcher], [action].concat(payload));
        });
    };

    return DispatcherProxy;
}();