"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
const utils_1 = require("../utils");
function Index(embeddify) {
    // TODO: extend from base class and move utils func out
    this._embeddify = embeddify;
    this._makeHeaders = (auth) => {
        return Object.assign((0, utils_1.removeNullish)({
            Authorization: auth ? `Bearer ${auth}` : this._embeddify.getApiField('auth'),
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }));
    };
    this._makeUrl = (path) => {
        return [
            this._embeddify.getApiField('host'),
            `${this._embeddify.getApiField('basePath')}${path}`
        ].join('');
    };
    this._postData = (url, headers, postData) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(postData),
            });
            if (!response.ok) {
                let errorBody;
                try {
                    errorBody = yield response.json();
                }
                catch (e) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                throw new Error(`HTTP error! status: ${response.status} body: ${JSON.stringify(errorBody)}`);
            }
            const resp = yield response.json();
            return resp;
        }
        catch (error) {
            console.error('Error fetching data: ', error);
        }
    });
    this.generateEmbeddings = (indexName, data) => __awaiter(this, void 0, void 0, function* () {
        const path = `pipelines/${indexName}/data`;
        const url = this._makeUrl(path);
        const customHeaders = this._makeHeaders(null);
        return this._postData(url, customHeaders, data);
    });
    this.search = (indexName, params) => __awaiter(this, void 0, void 0, function* () {
        const path = `search/${indexName}`;
        const url = this._makeUrl(path);
        const customHeaders = this._makeHeaders(null);
        return this._postData(url, customHeaders, params);
    });
}
exports.Index = Index;
