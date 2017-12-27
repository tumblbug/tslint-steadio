tslint-steadio
------------

Lint rules related to React, JSX, and TypeScript for the Steadio development team. Currently all rules have automatic fixes.

### Usage

tslint-steadio has peer dependencies on TSLint and TypeScript.

To use these lint rules with the default preset, use configuration inheritance via the `extends` keyword.
Here's a sample configuration where `tslint.json` lives adjacent to your `node_modules` folder:

```js
{
  "extends": ["tslint-steadio"],
  "rules": {
    // override rules here as needed
    "no-index-imports": false
  }
}
```

To lint your `.ts` **and** `.tsx` files you can simply run `tslint -c tslint.json 'src/**/*.{ts,tsx}'`.

### Rules

- `no-index-imports`
  - Disallows importing JS/TS from paths that end with `/index`.
  ```ts
  // Good:
  import { Component } from '../Component'

  // Bad:
  import { Component } from '../Component/index'
  ```
- `required-fields-first`
  - When declaring interfaces, all required members must be placed first.
  ```ts
  // Good:
  interface Props {
    a: string;
    b: string;
    c?: number;
    d?: number;
  }

  // Bad:
  interface Props {
    a: string;
    b?: number;
    c: string;
    d?: string;
  }
  ```

### Development

Quick Start:

1. `yarn`
1. `yarn build`
1. `yarn test`

References for development:
* [astexplorer](https://astexplorer.net/)
* [Custom TSLint Rules](https://palantir.github.io/tslint/develop/custom-rules/)
* [Testing Rules](https://palantir.github.io/tslint/develop/testing-rules/)
