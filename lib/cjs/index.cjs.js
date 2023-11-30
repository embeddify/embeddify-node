"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./index.js");
const Embeddify = (0, index_js_1.createEmbeddify)();
module.exports = Embeddify;
// expose constructor as a named property to enable mocking with Sinon.JS
module.exports.Embeddify = Embeddify;
// Allow use with the TypeScript compiler without `esModuleInterop`.
// We may also want to add `Object.defineProperty(exports, "__esModule", {value: true});` in the future, so that Babel users will use the `default` version.
module.exports.default = Embeddify;
