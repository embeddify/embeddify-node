"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmbeddify = void 0;
const resources = __importStar(require("./resources.js"));
const utils_1 = require("./utils");
const DEFAULT_HOST = 'https://api.embeddify.io';
const DEFAULT_BASE_PATH = '/v1/embeddings/';
function createEmbeddify() {
    Embeddify.prototype = {
        _setApiField(key, value) {
            this._api[key] = value;
        },
        getApiField(key) {
            return this._api[key];
        },
        _setApiKey(key) {
            if (key) {
                this._setApiField('auth', `Bearer ${key}`);
            }
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _prepResources() {
            for (const name in resources) {
                // @ts-ignore
                this[(0, utils_1.pascalToCamelCase)(name)] = new resources[name](this);
            }
        },
    };
    Embeddify.resources = resources;
    function Embeddify(key, config = {}) {
        if (!key) {
            throw new Error('Invalid API Key');
        }
        if (!(this instanceof Embeddify)) {
            return new Embeddify(key, config);
        }
        this._api = {
            auth: null,
            host: config.host || DEFAULT_HOST,
            basePath: config.basePath || DEFAULT_BASE_PATH,
            dev: false,
        };
        this._prepResources();
        this._setApiKey(key);
    }
    return Embeddify;
}
exports.createEmbeddify = createEmbeddify;
