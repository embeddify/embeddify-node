"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNullish = exports.pascalToCamelCase = void 0;
function pascalToCamelCase(name) {
    if (name === 'OAuth') {
        return 'oauth';
    }
    else {
        return name[0].toLowerCase() + name.substring(1);
    }
}
exports.pascalToCamelCase = pascalToCamelCase;
function removeNullish(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Argument must be an object');
    }
    return Object.keys(obj).reduce((result, key) => {
        if (obj[key] != null) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}
exports.removeNullish = removeNullish;
