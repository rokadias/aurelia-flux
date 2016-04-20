'use strict';

System.register([], function (_export, _context) {
    var Symbols;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export('Symbols', Symbols = function Symbols() {
                _classCallCheck(this, Symbols);
            });

            _export('Symbols', Symbols);

            Symbols.instanceDispatcher = Symbol('fluxDispatcher');
            Symbols.metadata = Symbol('fluxMetadata');
            Symbols.deactivators = Symbol('fluxDeactivators');
        }
    };
});