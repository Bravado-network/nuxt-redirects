As original [`@nuxtjs/redirect-module`](https://github.com/nuxt-community/redirect-module) seems abandoned, I created that repo with support of:
- client redirects with `vue-router` (thanks @ricardogobbosouza);
- `permanent: true` instead of 301/302 status code (like in [next.js redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects)) to avoid confusion and mistakes;
- [path-to-regexp](https://github.com/pillarjs/path-to-regexp) instead of 2 different scheme for client and server;

Todo:
- [ ] ansync functions as `to` params for `vue-router`

# Redirect Module 🔀

<!-- [![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![Dependencies][david-dm-src]][david-dm-href]
[![Standard JS][standard-js-src]][standard-js-href] -->

> Nuxt module to dynamically redirect initial requests

<!-- [📖 **Release Notes**](./CHANGELOG.md) -->

## Features

Redirecting URLs is an often discussed topic, especially when it comes to
SEO. Previously it was hard to create a "real" redirect without performance
loss or incorrect handling. But this time is over!

## Setup

1. Add the `@nuxtjs/redirect-module` dependency with `yarn` or `npm` to your project
2. Add `@nuxtjs/redirect-module` to the `modules` section of `nuxt.config.js`:
3. Configure it:

```js
{
  modules: [
    ['@nuxtjs/redirect-module', {
      // Redirect option here
    }]
  ]
}
```

### Using top level options

```js
{
  modules: [
    '@nuxtjs/redirect-module'
  ],
  redirect: [
    // Redirect options here
  ]
}
```

## Options

### `rules`

- Default: `[]`

Rules of your redirects.

### `onDecode`

- Default: `(req, res, next) => decodeURI(req.url)`

You can set decode.

### `onDecodeError`

- Default: `(error, req, res, next) => next(error)`

You can set callback when there is an error in the decode.

### `statusCode`

- Default: `302`

You can set the default statusCode which gets used when no statusCode is defined on the rule itself.

## Usage

Simply add the links you want to redirect as objects to the module option array:

```js
redirect: [
  { from: '/myoldurl', to: '/mynewurl' }
]
```

You can set up a custom status code as well. By default, it's *302*!

```js
redirect: [
  { from: '/myoldurl', to: '/mynewurl', statusCode: 301 }
]
```

You could use `permanent: true` for 301 redirect. Result the same as above.

```js
redirect: [
  { from: '/myoldurl', to: '/mynewurl', permanent: true }
]
```

We use [path-to-regexp](https://github.com/pillarjs/path-to-regexp) under the hood, so feel free to use `(.*)` and named params.

```js
redirect: [
  { from: '/myoldurl/(.*)', to: '/comeallhere' }, // Many urls to one
  { from: '/anotherold/:slug', to: '/new/:slug' } // One to one mapping
  { from: '/onemoreold/:category/:slug', to: '/new/:slug' } // Get rid of param
]
```

Furthermore you can use a function to create your `to` url as well :+1:
The requested `url` will be provided as arguments from middleware.
Function will be executed while navigation in server middleware and in client's `vue-router`.

```js
redirect: [
  {
    from: '/someUrlHere/(.*)',
    to: (url) => {
      const param = url.match(/someUrlHere\/(.*)$/)[1]
      return `/posts/${param}`
    }
  }
]
```

<!-- And if you really need more power... okay! You can also use a factory function
to generate your redirects:

```js
redirect: async () => {
  const someThings = await axios.get("/myApi") // It'll wait!
  return someThings.map(coolTransformFunction)
}
```

Now, if you want to customize your redirects, how your decode is done
or when there is some error in the decode, you can also:

```js
redirect: {
  rules: [
    { from: '/myoldurl', to: '/mynewurl' }
  ],
  onDecode: (req, res, next) => decodeURI(req.url),
  onDecodeError: (error, req, res, next) => next(error)
}
```

**ATTENTION**: The factory function **must** return an array with redirect
objects (as seen above). -->

## Gotchas

Due to inconsistency of server middleware and vue-router you can't use async functions for `to`.
If you want to send a PR with that feature - feel free!

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Alexander Lichter <npm@lichter.io>

Copyright (c) Artur Kornakov <artur@bravado.co>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/dt/@nuxtjs/redirect-module.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/redirect-module
[npm-downloads-src]: https://img.shields.io/npm/v/@nuxtjs/redirect-module/latest.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/redirect-module
[circle-ci-src]: https://img.shields.io/circleci/project/github/nuxt-community/redirect-module.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/nuxt-community/redirect-module
[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/redirect-module.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-community/redirect-module
[david-dm-src]: https://david-dm.org/nuxt-community/redirect-module/status.svg?style=flat-square
[david-dm-href]: https://david-dm.org/nuxt-community/redirect-module
[standard-js-src]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-js-href]: https://standardjs.com
