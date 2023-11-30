import {EmbeddifyObject, EmbeddifyResourceObject} from "../types";
import {removeNullish} from "../utils";

export function Index(
    this: EmbeddifyResourceObject,
    embeddify: EmbeddifyObject,
): void {
    // TODO: extend from base class and move utils func out
    this._embeddify = embeddify;
    this._makeHeaders = (auth: string | null): HeadersInit => {
        return Object.assign(
            removeNullish({
                Authorization: auth ? `Bearer ${auth}` : this._embeddify.getApiField('auth'),
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            })
        );
    }
    this._makeUrl = (path: string): string => {
        return [
            this._embeddify.getApiField('host'),
            `${this._embeddify.getApiField('basePath')}${path}`
        ].join('');
    }
    this._postData = async (url: string, headers: HeadersInit, postData: any) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(postData),
            });
            if (!response.ok) {
                let errorBody;
                try {
                    errorBody = await response.json();
                } catch (e) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                throw new Error(`HTTP error! status: ${response.status} body: ${JSON.stringify(errorBody)}`);
            }
            const resp = await response.json();
            return resp;
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    this.generateEmbeddings = async (indexName, data) => {
        const path = `pipelines/${indexName}/data`;
        const url = this._makeUrl(path);
        const customHeaders = this._makeHeaders(null);

        return this._postData(url, customHeaders, data)
    }

    this.search = async (indexName: string, params) => {
        const path = `search/${indexName}`;
        const url = this._makeUrl(path);
        const customHeaders = this._makeHeaders(null);

        return this._postData(url, customHeaders, params)
    }
}
