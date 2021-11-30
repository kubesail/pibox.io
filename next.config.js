module.exports = {
  async redirects() {
    return [
      {
        source: '/rpiboot',
        destination: 'https://docs.kubesail.com/guides/pibox/rpiboot',
        permanent: false,
      },
      {
        source: '/hackersetup',
        destination: 'https://docs.kubesail.com/guides/pibox/rpiboot/',
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
}
