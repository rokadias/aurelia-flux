'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.waitFor = exports.handle = exports.Dispatcher = undefined;

var _instanceDispatcher = require('./instance-dispatcher');

Object.defineProperty(exports, 'Dispatcher', {
    enumerable: true,
    get: function get() {
        return _instanceDispatcher.Dispatcher;
    }
});

var _handle = require('./decorators/handle');

Object.defineProperty(exports, 'handle', {
    enumerable: true,
    get: function get() {
        return _handle.handle;
    }
});

var _waitFor = require('./decorators/waitFor');

Object.defineProperty(exports, 'waitFor', {
    enumerable: true,
    get: function get() {
        return _waitFor.waitFor;
    }
});
exports.configure = configure;

var _lifecycleManager = require('./lifecycle-manager');

var _router = require('./router');

function configure(aurelia, configCallback) {
    _lifecycleManager.LifecycleManager.interceptContainerInvocation();
    _lifecycleManager.LifecycleManager.interceptHtmlBehaviorResource();
    _router.RouterManager.AddFluxPipelineStep(aurelia);
}