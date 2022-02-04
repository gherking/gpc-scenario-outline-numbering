# gpc-scenario-outline-numbering

![Downloads](https://img.shields.io/npm/dw/gpc-scenario-outline-numbering?style=flat-square)
![Version@npm](https://img.shields.io/npm/v/gpc-scenario-outline-numbering??label=version%40npm&style=flat-square)
![Version@git](https://img.shields.io/github/package-json/v/gherking/gpc-scenario-outline-numbering?/master?label=version%40git&style=flat-square)
![CI](https://img.shields.io/github/workflow/status/gherking/gpc-scenario-outline-numbering?/CI/master?label=ci&style=flat-square)
![Docs](https://img.shields.io/github/workflow/status/gherking/gpc-scenario-outline-numbering?/Docs/master?label=docs&style=flat-square)

This precompiler can add numbering column to Examples tables, and apply formatting to the name of the Scenario Outline.

## Usage

```javascript
'use strict';
const compiler = require('gherking');
const {Template} = require('gpc-scenario-outline-numbering?');

let ast = compiler.load('./features/src/login.feature');
ast = compiler.process(
    ast,
    new ScenarioOutlineNumbering({
        // config
    })
);
await compiler.save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

```typescript
'use strict';
import {load, process, save} from "gherking";
import ScenarioOutlineNumbering = require("gpc-scenario-outline-numbering");

let ast = await load("./features/src/login.feature");
ast = process(
    ast,
    new ScenarioOutlineNumbering({
        // config
    })
);
await save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

This package uses [debug](https://www.npmjs.com/package/debug) for logging, use `gpc:scenario-outline-numbering` :

```shell
DEBUG=gpc:scenario-outline-numbering* gherking ...
```

For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gpc-scenario-outline-numbering/).