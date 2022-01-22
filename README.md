# gpc-scenario-outline-numbering

![Downloads](https://img.shields.io/npm/dw/gpc-scenario-outline-numbering?style=flat-square)
![Version@npm](https://img.shields.io/npm/v/gpc-scenario-outline-numbering??label=version%40npm&style=flat-square)
![Version@git](https://img.shields.io/github/package-json/v/gherking/gpc-scenario-outline-numbering?/master?label=version%40git&style=flat-square)
![CI](https://img.shields.io/github/workflow/status/gherking/gpc-scenario-outline-numbering?/CI/master?label=ci&style=flat-square)
![Docs](https://img.shields.io/github/workflow/status/gherking/gpc-scenario-outline-numbering?/Docs/master?label=docs&style=flat-square)

This repository is a template to create precompilers for GherKing.

## Usage

```javascript
'use strict';
const compiler = require('gherking');
const {Template} = require('gpc-scenario-outline-numbering?');

let ast = compiler.load('./features/src/login.feature');
ast = compiler.process(
    ast,
    new Template({
        // config
    })
);
compiler.save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

```typescript
'use strict';
import {load, process, save} from "gherking";
import {Template} from "gpc-scenario-outline-numbering?";

let ast = load("./features/src/login.feature");
ast = process(
    ast,
    new ScenarioOutlineNumbering({
        // config
    })
);
save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gpc-scenario-outline-numbering?/).

This package uses [debug](https://www.npmjs.com/package/debug) for logging.