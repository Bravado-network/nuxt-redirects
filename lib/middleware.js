const { match, compile } = require('path-to-regexp')

// Creates new middleware using provided options
module.exports = function (options) {
  return async function redirectRoute (req, res, next) {
    let decodedBaseUrl

    try {
      decodedBaseUrl = options.onDecode(req, res, next)
    } catch (error) {
      return options.onDecodeError(error, req, res, next)
    }

    const foundRule = options.rules.find((rule) => {
      const isMatch = match(rule.from)
      return Boolean(isMatch(decodedBaseUrl))
    })

    if (!foundRule) {
      return next()
    }

    // Expect rule 'to' to either a
    // 1) string with params supported
    // 2) function taking from & req (when from is regex, req might be more interesting)

    let toTarget

    try {
      toTarget = typeof foundRule.to === 'function' ? await foundRule.to(foundRule.from, req) : foundRule.to
    } catch (error) {
      return next(error)
    }

    // get params from url
    const matchers = match(foundRule.from, { decode: decodeURIComponent })
    const { params } = matchers(decodedBaseUrl)

    // fill new params to url
    if (params) {
      const toPath = compile(toTarget, { encode: encodeURIComponent })
      toTarget = toPath(params)
    } else {
      toTarget = encodeURI(toTarget)
    }

    try {
      res.setHeader('Location', toTarget)
    } catch (error) {
      // Not passing the error as it's caused by URL that was user-provided so we
      // can't do anything about the error.
      return next()
    }

    let statusCode = foundRule.statusCode || options.statusCode
    if (foundRule.permanent) {
      statusCode = 301
    }

    res.statusCode = statusCode
    res.end()
  }
}
