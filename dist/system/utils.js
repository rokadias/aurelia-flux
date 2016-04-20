'use strict';

System.register([], function (_export, _context) {
    var Utils;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function globStringToRegexString(str) {
        return preg_quote(str).replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
    }
    function preg_quote(str, delimiter) {
        return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
    }

    return {
        setters: [],
        execute: function () {
            _export('Utils', Utils = function () {
                function Utils() {
                    _classCallCheck(this, Utils);
                }

                Utils.patternsToRegex = function patternsToRegex(patterns) {
                    if (Array.isArray(patterns) === false) {
                        patterns = Array.of(patterns);
                    }

                    return new RegExp('^' + patterns.map(globStringToRegexString).join('|') + '$');
                };

                return Utils;
            }());

            _export('Utils', Utils);
        }
    };
});