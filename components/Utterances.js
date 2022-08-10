import React, { useEffect } from 'react'
import { ErrorBoundary, FallbackComponent } from '../util/ErrorBoundary'

const Utterances = ({
  repo,
  issueTerm = 'title',
  label = '',
  crossOrigin = 'anonymous',
  async = true,
  style = {},
}) => {
  const rootElm = React.createRef()

  useEffect(() => {
    // Ensure script is loaded with the correct params by removing cached element
    while (rootElm.current.firstChild) {
      rootElm.current.removeChild(rootElm.current.firstChild)
    }

    const utterances = document.createElement('script')

    let theme = 'github-light'
    if (typeof window !== 'undefined') {
      const dataTheme = document.documentElement.getAttribute('data-theme')
      if (dataTheme === 'light') theme = 'github-light'
      else if (dataTheme === 'dark') theme = 'github-dark'
    }

    // set config to of script element
    Object.entries({
      src: 'https://utteranc.es/client.js',
      repo,
      'issue-term': issueTerm,
      label,
      theme,
      crossOrigin,
      async,
    }).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })
    // attach script element
    rootElm.current.appendChild(utterances)
  }, [])

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent('Utterances', 'Utterances error')}>
      <div id="utterances_container" ref={rootElm} style={style} />
    </ErrorBoundary>
  )
}

export default Utterances
