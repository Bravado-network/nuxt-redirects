module.exports = [
  { from: '/redirected', to: '/' },
  { from: '/permanent', to: '/', permanent: true },
  { from: '/äßU<', to: '/' },
  { from: '/äöü', to: '/äßU<' },
  { from: '/many/(.*)', to: '/posts/abcde' },
  { from: '/mapped/:slug', to: '/posts/:slug' },
  { from: '/external', to: 'https://google.com/' },
  { from: '/function', to: () => '/' },
  { from: '/errorInTo', to: '/mapped/\uD800ab\u0001/' }
  // {
  //   from: '/functionAsync',
  //   to: () => new Promise((resolve) => {
  //     setTimeout(() => resolve('/'), 2000)
  //   })
  // },
  // {
  //   from: '/functionAsync/(.*)',
  //   to: (from, req) => new Promise((resolve) => {
  //     const param = req.url.match(/functionAsync\/(.*)$/)[1]
  //     setTimeout(() => resolve(`/posts/${param}`), 2000)
  //   })
  // },
  // {
  //   from: '/errorInToFunction',
  //   to: () => Promise.reject(new Error('forced error'))
  // }
]
