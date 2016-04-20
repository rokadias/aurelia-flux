'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterManager = undefined;

var _aureliaRouter = require('aurelia-router');

var _fluxDispatcher = require('./flux-dispatcher');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouterManager = exports.RouterManager = function () {
  function RouterManager() {
    _classCallCheck(this, RouterManager);
  }

  RouterManager.AddFluxPipelineStep = function AddFluxPipelineStep(aurelia) {
    var router = aurelia.container.get(_aureliaRouter.Router);
    var configuration = new _aureliaRouter.RouterConfiguration();

    configuration.addPipelineStep("modelbind", FluxLifeCycleStep);
    router.configure(configuration);
  };

  return RouterManager;
}();

var FluxLifeCycleStep = function () {
  function FluxLifeCycleStep() {
    _classCallCheck(this, FluxLifeCycleStep);
  }

  FluxLifeCycleStep.prototype.run = function run(context, next) {

    if (context && context.plan && context.plan.default) {
      _fluxDispatcher.FluxDispatcher.instance.strategy = context.plan.default.strategy;
    }

    return next();
  };

  return FluxLifeCycleStep;
}();