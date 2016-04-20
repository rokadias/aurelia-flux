'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function globStringToRegexString(str) {
    return preg_quote(str).replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
}
function preg_quote(str, delimiter) {
    return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
}

var Utils = exports.Utils = function () {
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
}();