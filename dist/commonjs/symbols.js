'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Symbols = exports.Symbols = function Symbols() {
    _classCallCheck(this, Symbols);
};

Symbols.instanceDispatcher = Symbol('fluxDispatcher');
Symbols.metadata = Symbol('fluxMetadata');
Symbols.deactivators = Symbol('fluxDeactivators');