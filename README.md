# Embeddify Node.js Library

[![Version](https://img.shields.io/npm/v/embeddify-node.svg)](https://www.npmjs.org/package/embeddify-node)

The Embeddify Node library provides convenient access to the Embeddify API from applications written in server-side
JavaScript.

## Documentation

See the [`embeddify-node` API docs](https://embeddify.io/docs/api?lang=node) for Node.js.

See [video demonstrations][youtube-playlist] covering how to use the library.

## Requirements

Node 14 or higher.

## Installation

Install the package with:

```sh
npm install embeddify-node
# or
yarn add embeddify-node
```

## Usage

The package needs to be configured with your account's secret key, which is
available in the [Embeddify Dashboard][api-keys]. Require it with the key's
value:

<!-- prettier-ignore -->

```js
const embeddify = require('embeddify-node')('API_KEY');

const indexName = 'salesforce_customer_intent';
const dataRow = {
    customerId: '123u9812u3',
    text: `Sarah is an investor with a particular interest in 
      precious metals, especially gold. 
      Sarah thinks of gold as a stable investment. 
      She expressed a strong intent to diversify her portfolio 
      with gold investment products such as gold bullion 
      and gold-backed ETFs.
`};

(async () => {
    await embeddify.index.generateEmbeddings(indexName, dataRow);
})();
```

Or using ES modules and `async`/`await`:

```js
import Embeddify from 'embeddify-node';

const embeddify = new Embeddify('API_KEY');

const indexName = 'salesforce_customer_intent';
const dataRow = {
    customerId: '123u9812u3',
    text: `Sarah is an investor with a particular interest in 
      precious metals, especially gold. 
      Sarah thinks of gold as a stable investment. 
      She expressed a strong intent to diversify her portfolio 
      with gold investment products such as gold bullion 
      and gold-backed ETFs.
`};

(async () => {
    await embeddify.index.generateEmbeddings(indexName, dataRow);
})();
```

## Support

New features and bug fixes are released on the latest major version of the `embeddify-node` package. If you are on an older
major version, we recommend that you upgrade to the latest in order to use the new features and bug fixes including
those for security vulnerabilities. Older major versions of the package will continue to be available for use, but will
not be receiving any updates.

## More Information & Popular embeddify.io guides

...


[api-keys]: https://embeddify.io/app


