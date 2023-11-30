import {Headers} from "undici-types/fetch";

export type EmbeddifyObject = {
    _setApiField: <K extends keyof EmbeddifyObject['_api']>(
        name: K,
        value: EmbeddifyObject['_api'][K]
    ) => void;
    _setApiKey: (apiKey: string) => void;
    getApiField: <K extends keyof EmbeddifyObject['_api']>(
        key: K
    ) => EmbeddifyObject['_api'][K];
    _api: {
        auth: string | null;
        host: string;
        basePath: string;
        dev: boolean;
    };
    _prepResources: () => void;
}

export type EmbeddifyResourceObject = {
    _embeddify: EmbeddifyObject;
    _makeHeaders: (auth:string | null) => HeadersInit;
    _makeUrl: (path: string) => string;
    _postData: (url: string, headers: HeadersInit, postData: any) => Promise<void>;
    generateEmbeddings: (indexName: string, data: any) => Promise<void>;
    search: (indexName: string, params: any) => Promise<void>;
}

