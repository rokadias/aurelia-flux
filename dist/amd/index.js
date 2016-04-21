define(['exports', './instance-dispatcher', './decorators/handle', './decorators/waitFor', './lifecycle-manager', './router'], function (exports, _instanceDispatcher, _handle, _waitFor, _lifecycleManager, _router) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.waitFor = exports.handle = exports.Dispatcher = undefined;
    Object.defineProperty(exports, 'Dispatcher', {
        enumerable: true,
        get: function () {
            return _instanceDispatcher.Dispatcher;
        }
    });
    Object.defineProperty(exports, 'handle', {
        enumerable: true,
        get: function () {
            return _handle.handle;
        }
    });
    Object.defineProperty(exports, 'waitFor', {
        enumerable: true,
        get: function () {
            return _waitFor.waitFor;
        }
    });
    exports.configure = configure;
    function configure(aurelia, configCallback) {
        _lifecycleManager.LifecycleManager.interceptContainerInvocation();
        _lifecycleManager.LifecycleManager.interceptHtmlBehaviorResource();
        _router.RouterManager.AddFluxPipelineStep(aurelia);
    }
});