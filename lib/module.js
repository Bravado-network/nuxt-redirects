async function redirectModule (moduleOptions) {
  const defaults = {
    rules: [],
    onDecode: (req, res, next) => decodeURI(req.url),
    onDecodeError: (error, req, res, next) => next(error),
    statusCode: 302
  }

  const options = {
    ...defaults,
    ...await parseOptions(this.options.redirect),
    ...await parseOptions(moduleOptions)
  }

  this.extendRoutes((routes) => {
    // TODO: deside what to do with functions
    options.rules.forEach((route) => {
      routes.push({
        path: route.from,
        redirect: route.redirect || route.to
      })
    })
  })

  options.rules = options.rules.map(rule => ({ ...rule }))

  const middleware = require('./middleware.js')(options)
  this.addServerMiddleware(middleware)
}

async function parseOptions (options = {}) {
  if (typeof options === 'function') {
    options = await options()
  }

  if (Object.keys(options).length === 0) {
    return []
  }

  if (Array.isArray(options)) {
    return { rules: options }
  }

  if (typeof options.rules === 'function') {
    options.rules = await options.rules()
  }

  if (options.rules && !Array.isArray(options.rules)) {
    options.rules = [options.rules]
  }

  return options
}

module.exports = redirectModule
module.exports.meta = require('../package.json')
