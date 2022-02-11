const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  experimental: {
    outputStandalone: true,
  },
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
    ]
  },
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
