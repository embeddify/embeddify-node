import {EmbeddifyObject} from './types';
import * as resources from './resources.js';
import {pascalToCamelCase} from "./utils";

const DEFAULT_HOST = 'https://api.embeddify.io';
const DEFAULT_BASE_PATH = '/v1/embeddings/';


export function createEmbeddify() {

    Embeddify.prototype = {
        _setApiField<K extends keyof EmbeddifyObject['_api']>(
            key: K,
            value: EmbeddifyObject['_api'][K]
        ): void {
            this._api[key] = value;
        },
        getApiField<K extends keyof EmbeddifyObject['_api']>(
            key: K
        ): EmbeddifyObject['_api'][K] {
            return this._api[key];
        },
        _setApiKey(key: string): void {
            if (key) {
                this._setApiField('auth', `Bearer ${key}`);
            }
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _prepResources(): void {
            for (const name in resources) {
                // @ts-ignore
                this[pascalToCamelCase(name)] = new resources[name](this);
            }
        },

    } as EmbeddifyObject;
    Embeddify.resources = resources;

    function Embeddify(
        this: EmbeddifyObject,
        key: string,
        config: Record<string, unknown> = {}
    ) {
        if(!key) {
            throw new Error('Invalid API Key')
        }

        if (!(this instanceof Embeddify)) {
            return new (Embeddify as any)(key, config);
        }


        this._api = {
            auth: null,
            host: config.host as string || DEFAULT_HOST,
            basePath: config.basePath as string || DEFAULT_BASE_PATH,
            dev: false,
        };

        this._prepResources();
        this._setApiKey(key);
    }


    return Embeddify;
}
