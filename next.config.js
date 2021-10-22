module.exports = {
  async redirects() {
    return [
      {
        source: '/rpiboot',
        destination: 'https://docs.kubesail.com/guides/pibox/rpiboot',
        permanent: true,
      },
      {
        source: '/case',
        destination: 'https://docs.kubesail.com/guides/pibox/case',
        permanent: true,
      },
    ]
  },
}
