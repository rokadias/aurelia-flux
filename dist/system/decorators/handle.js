'use strict';

System.register(['../metadata'], function (_export, _context) {
    var Metadata;
    return {
        setters: [function (_metadata) {
            Metadata = _metadata.Metadata;
        }],
        execute: function () {
            function handle() {
                for (var _len = arguments.length, patterns = Array(_len), _key = 0; _key < _len; _key++) {
                    patterns[_key] = arguments[_key];
                }

                return function (target, method) {

                    var metadata = Metadata.getOrCreateMetadata(target);

                    if (metadata.handlers.has(method) === false) {
                        metadata.handlers.set(method, []);
                    }

                    metadata.handlers.set(method, metadata.handlers.get(method).concat(patterns));
                };
            }

            _export('handle', handle);
        }
    };
});