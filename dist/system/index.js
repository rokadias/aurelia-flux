'use strict';

System.register(['./instance-dispatcher', './decorators/handle', './decorators/waitFor', './lifecycle-manager', './router'], function (_export, _context) {
    var LifecycleManager, RouterManager;
    return {
        setters: [function (_instanceDispatcher) {
            var _exportObj = {};
            _exportObj.Dispatcher = _instanceDispatcher.Dispatcher;

            _export(_exportObj);
        }, function (_decoratorsHandle) {
            var _exportObj2 = {};
            _exportObj2.handle = _decoratorsHandle.handle;

            _export(_exportObj2);
        }, function (_decoratorsWaitFor) {
            var _exportObj3 = {};
            _exportObj3.waitFor = _decoratorsWaitFor.waitFor;

            _export(_exportObj3);
        }, function (_lifecycleManager) {
            LifecycleManager = _lifecycleManager.LifecycleManager;
        }, function (_router) {
            RouterManager = _router.RouterManager;
        }],
        execute: function () {
            function configure(aurelia, configCallback) {
                LifecycleManager.interceptClassActivator();
                LifecycleManager.interceptHtmlBehaviorResource();
                RouterManager.AddFluxPipelineStep(aurelia);
            }

            _export('configure', configure);
        }
    };
});