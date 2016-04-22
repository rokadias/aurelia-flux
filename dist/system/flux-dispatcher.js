'use strict';

System.register(['bluebird', './instance-dispatcher'], function (_export, _context) {
    var Promise, Dispatcher, FluxDispatcher;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_bluebird) {
            Promise = _bluebird.default;
        }, function (_instanceDispatcher) {
            Dispatcher = _instanceDispatcher.Dispatcher;
        }],
        execute: function () {
            _export('FluxDispatcher', FluxDispatcher = function () {
                function FluxDispatcher() {
                    _classCallCheck(this, FluxDispatcher);

                    this.instanceDispatchers = new Map();
                    this.isDispatching = false;
                    this.queue = [];
                    this.typesPromises = new Map();
                }

                FluxDispatcher.prototype.getOrCreateTypeDispatchers = function getOrCreateTypeDispatchers(type) {
                    if (this.instanceDispatchers.has(type) === false) {
                        this.instanceDispatchers.set(type, new Set());
                    }

                    return this.instanceDispatchers.get(type);
                };

                FluxDispatcher.prototype.getOrCreateTypePromises = function getOrCreateTypePromises(type) {
                    if (this.typesPromises.has(type) === false) {
                        this.typesPromises.set(type, Promise.defer());
                    }

                    return this.typesPromises.get(type);
                };

                FluxDispatcher.prototype.registerInstanceDispatcher = function registerInstanceDispatcher(dispatcher) {
                    if (dispatcher === undefined || dispatcher.instance === undefined) {
                        return;
                    }

                    var typeDispatchers = this.getOrCreateTypeDispatchers(Object.getPrototypeOf(dispatcher.instance));

                    typeDispatchers.add(dispatcher);
                };

                FluxDispatcher.prototype.unregisterInstanceDispatcher = function unregisterInstanceDispatcher(dispatcher) {
                    if (dispatcher === undefined || dispatcher.instance === undefined) {
                        return;
                    }

                    var type = Object.getPrototypeOf(dispatcher.instance);

                    if (this.instanceDispatchers.has(type) === false) {
                        return;
                    }

                    this.instanceDispatchers.get(type).delete(dispatcher);

                    if (this.instanceDispatchers.get(type).size === 0) {
                        this.instanceDispatchers.delete(type);
                    }
                };

                FluxDispatcher.prototype.dispatch = function dispatch(action, payload) {
                    this.$dispatch(action, payload, false);
                };

                FluxDispatcher.prototype.$dispatch = function $dispatch(action, payload, fromQueue) {
                    var _this = this;

                    if (this.isDispatching && fromQueue === false) {
                        this.queue.push([action, payload]);
                        return;
                    }

                    this.isDispatching = true;

                    this.typesPromises = new Map();

                    this.instanceDispatchers.forEach(function (dispatchers, type) {
                        var typePromise = _this.getOrCreateTypePromises(type);
                        var promises = [];

                        dispatchers.forEach(function (dispatcher) {
                            promises.push(dispatcher.dispatchOwn.apply(dispatcher, [action, payload]));
                        });

                        var reflects = promises.map(function (promise) {
                            return promise.reflect();
                        });
                        Promise.all(reflects).then(function () {
                            typePromise.resolve();
                        });
                    });

                    this.typesPromises.forEach(function (promise, type) {
                        if (_this.instanceDispatchers.has(type) === false) {

                            var name = type !== undefined && type.constructor !== undefined && type.constructor.name !== undefined ? type.constructor.name : type.toString();
                            console.warn('You are waiting for a type \'' + name + '\' that didn\'t handle event \'' + action + '\'. ' + name + ' promise has been resolved automatically.');

                            promise.resolve();
                        }
                    });

                    var allTypesPromises = Array.from(this.typesPromises.values()).map(function (defer) {
                        return defer.promise;
                    });

                    var allTypesReflects = allTypesPromises.map(function (promise) {
                        return promise.reflect();
                    });
                    Promise.all(allTypesReflects).then(function () {
                        var next = _this.queue.shift();
                        setTimeout(function () {
                            if (next !== undefined) {
                                _this.$dispatch(next[0], next[1], true);
                            } else {
                                _this.isDispatching = false;
                            }
                        }, 0);
                    });
                };

                FluxDispatcher.prototype.waitFor = function waitFor(types, handler) {
                    var _this2 = this;

                    if (Array.isArray(types) === false) {
                        types = [types];
                    }

                    var typesPromises = types.map(function (type) {
                        return _this2.getOrCreateTypePromises(type.prototype).promise;
                    });

                    var def = Promise.defer();

                    var typesReflects = typesPromises.map(function (promise) {
                        return promise.reflect();
                    });
                    Promise.all(typesReflects).then(function () {
                        Promise.resolve(handler()).then(function (ret) {
                            def.resolve(ret);
                        }).catch(function (err) {
                            def.reject(err);
                        });
                    });

                    return def.promise;
                };

                return FluxDispatcher;
            }());

            _export('FluxDispatcher', FluxDispatcher);

            FluxDispatcher.instance = new FluxDispatcher();
        }
    };
});