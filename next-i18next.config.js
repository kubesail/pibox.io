const { i18nextPlugin } = require('translation-check')

module.exports = {
  i18n: {
    // use: [i18nextPlugin],
    reloadOnPrerender: true,
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
}
