'use strict';

System.register(['../metadata'], function (_export, _context) {
    var Metadata;
    return {
        setters: [function (_metadata) {
            Metadata = _metadata.Metadata;
        }],
        execute: function () {
            function waitFor() {
                for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
                    types[_key] = arguments[_key];
                }

                return function (target, method) {
                    var metadata = Metadata.getOrCreateMetadata(target);

                    if (metadata.awaiters.has(method) === false) {
                        metadata.awaiters.set(method, []);
                    }

                    metadata.awaiters.set(method, metadata.awaiters.get(method).concat(types));
                };
            }

            _export('waitFor', waitFor);
        }
    };
});