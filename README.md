# Custom Env Loading Proposal for NextJS

This working concept/proposal is to allow developers to opt-in into loading `.env.*` files by creating an `env.config.json`.

## Quick Links

[Why load from a config file?](#why-load-from-a-config-file)

- [Pros](#pros)
- [Cons](#cons)

[Installation](#installation)

[Commands](#commands)

[Notes](#notes)

## Why load from a config file?

In short, NextJS only allows `.env.*` files to be loaded by `NODE_ENV`. While this allows developers to load environment specfic `.env.*` files, it unfortunately requires `NODE_ENV` to be changed. Ideally, this should be avoided since Next (and 3rd party dependencies) expect `NODE_ENV` to be one of the following: `development`, `production`, and `test`: [source](https://nextjs.org/docs/messages/non-standard-node-env). In summation, if a developer changes `NODE_ENV=development` and uses `next build`, then there's a chance they could ship unoptimized/dead code.

Instead, this proposal avoids changing `NODE_ENV` by loading from an `env.config.json`. Next can hand-off control to the developer who can then decide which `.env.*` files are loaded (reusable), how they're loaded (specificity), and when their loaded (by a configurable environment):

**env.config.json**

```json
{
  "development": {
    "debug": true,
    "paths": [".env.base", ".env.dev"]
  },
  "production": {
    "debug": true,
    "paths": [".env.base", ".env.prod"]
  },
  "staging": {
    "debug": true,
    "paths": [".env.base", ".env.stage"]
  },
  "testing": {
    "debug": false,
    "paths": [".env.base", ".env.test"]
  }
}
```

These **environments** can be named anything and they can load/share/mix-and-match `.env.*` files without needing to recreate them per environment:

```json
{
  "envA": {
    "debug": true,
    "paths": [".env.abc123"]
  },
  "envB": {
    "debug": true,
    "paths": [".env.abc123", ".env.def456"]
  },
  "envC": {
    "debug": true,
    "paths": [".env.hij789", ".env.def456", ".env.abc123"]
  }
}
```

These **environments** can then either be loaded by a flag or by an Env variable:

```json
{
  "scripts": {
    "devconfig": "LOAD_CONFIG=development next dev",
    "devflag": "next dev -e development"
  }
}
```

### Pros

✔️ Backwards compatible

✔️ The file can be tracked by git since it doesn't contain secrets

✔️ Like `next.config.js`, creating an `env.config.json` file would be **opt-in**

✔️ Like `next.config.js`, creating an `env.config.json` file would give developers more control over their environment setup

✔️ Keeps `NODE_ENV` to the standard environments: `development`, `production`, and `test` by disallowing `NODE_ENV` overrides with [#19046](https://github.com/vercel/next.js/issues/19046)

✔️ Adheres to the `NEXT_PUBLIC` env convention

✔️ Unopinionated about `.env.*` naming

✔️ Unopinionated about config environment naming

✔️ Supports loading one or multiple `.env.*` files at once

✔️ Allows reusing `.env.*` files that may not change from environment to environment

### Cons

✔️ Breaks away from the CRA's `.env.*` convention: `.env.{mode}.local`, `.env.local`, `.env.{mode}`, `.env`

✔️ Would require either adding and incorporating a flag: `-e development` and/or adding and incorporating some sort of `LOAD_CONFIG` Env variable

## Installation

1.) Clone repo:

```bash
git clone git@github.com:mattcarlotta/next-env-proposal.git
```

2.) Change directory and install deps:

```bash
# with npm
cd next-env-proposal && npm install

# or with yarn
cd next-env-proposal && yarn
```

3.) Run one of the [commands](#commands) below.

## Commands

Run individual `package.json` scripts by running the following commands (if using `npm`, swap `yarn` for `npm run`):

| `yarn <command>` | Description                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| `dev`            | Runs next in the `development` environment and loads `development` config.                       |
| `stage`          | Builds next in the `production` environment and loads `staging` config.                          |
| `staging`        | Runs next in the `production` environment and loads `staging` config.                            |
| `build`          | Builds next in the `production` and loads `production` config.                                   |
| `start`          | Runs next in the `production` and loads `production` config.                                     |
| `test`           | Runs tests in the `test` environment and loads `testing` config.                                 |
| `test:cov`       | Runs tests in the `test` environment and loads `testing` config.                                 |
| `test:e2e`       | Builds next in the `production` environment with `staging` config and starts cypress test suite. |

## Notes

This demo utilizes [preloading](https://nodejs.org/api/cli.html#cli_r_require_module) to work around Next's current Env implementation.

> -r, --require module#
> Added in: v1.6.0
> Preload the specified module at startup.
>
> Follows require()'s module resolution rules. module may be either a path to a file, or a node module name.
>
> Only CommonJS modules are supported. Attempting to preload a ES6 Module using --require will fail with an error.

However, this proposal would aim to internalalize the Env config initialization within `@next/env` so that preloading isn't required.
