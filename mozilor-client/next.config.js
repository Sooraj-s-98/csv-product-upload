module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:4000' // development api
          : 'http://localhost:4000' // production api
  }
}