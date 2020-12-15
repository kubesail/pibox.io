import Head from 'next/head'
import NavBar from './NavBar'
import navButtons from '../config/buttons'

import styles from './Layout.module.css'

const Layout = props => {
  return (
    <div className={styles.Layout}>
      <Head>
        <title>PiBox</title>
      </Head>

      <NavBar navButtons={navButtons} />
      <div className={styles.Content}>{props.children}</div>
    </div>
  )
}

export default Layout
