const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const i18nConfig = require('./next-i18next.config')

module.exports = withBundleAnalyzer({
  assetPrefix: process.env.BUILD_ASSET_PREFIX || '',
  swcMinify: true,
  productionBrowserSourceMaps: true,
  async redirects() {
    return [
      {
        source: '/rpiboot',
        destination: 'https://docs.kubesail.com/guides/pibox/rpiboot',
        permanent: false,
      },
      {
        source: '/case',
        destination: 'https://docs.kubesail.com/guides/pibox/hardware',
        permanent: false,
      },
      {
        source: '/hackersetup',
        destination: 'https://docs.kubesail.com/guides/pibox/hardware',
        permanent: false,
      },
      {
        source: '/setup',
        destination: 'https://docs.kubesail.com/getting-started/',
        permanent: false,
      },
    ]
  },
  ...i18nConfig,
  // webpack: config => {
  //   config.module.rules.push({
  //     test: /\.(eot|ttf|woff|woff2|mp4|pdf|webm|txt|json|obj|mtl)$/,
  //     type: 'asset/resource',
  //     generator: {
  //       filename: 'static/chunks/[path][name].[hash][ext]',
  //     },
  //   })
  //   return config
  // },
})
