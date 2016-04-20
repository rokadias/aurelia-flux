'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Metadata = undefined;

var _symbols = require('./symbols');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Metadata = exports.Metadata = function () {
    Metadata.getOrCreateMetadata = function getOrCreateMetadata(target) {
        if (target[_symbols.Symbols.metadata] === undefined) {
            target[_symbols.Symbols.metadata] = new Metadata();
        }

        return target[_symbols.Symbols.metadata];
    };

    Metadata.exists = function exists(target) {
        return target[_symbols.Symbols.metadata] !== undefined && target[_symbols.Symbols.metadata] instanceof Metadata;
    };

    function Metadata() {
        _classCallCheck(this, Metadata);

        this.handlers = new Map();
        this.awaiters = new Map();
    }

    return Metadata;
}();