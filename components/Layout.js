import Head from 'next/head'
import NavBar from './NavBar'

import styles from './Layout.module.css'

function Layout({ user, loading = false, children }) {
  return (
    <div className={styles.Layout}>
      <Head>
        <title>PiBox</title>
      </Head>

      <NavBar nuser={user} loading={loading} />

      <div className={styles.Content}>{children}</div>
    </div>
  )
}

export default Layout
