import styles from './NavBar.module.css'
import Link from 'next/link'

const NavBar = ({ user, loading }) => {

  const appTitle = `PiBox`

  return (

    <div className={styles.NavBar}>
      
      <Link href="/">
        <div className={styles.Header}>{appTitle}</div>
      </Link>

      <div className={styles.NavButtonContainer}>
      
        <Link href="/blog">
          <div className={styles.NavButton}>
            <span className={styles.Label}>Blog</span>
          </div>
        </Link>

        <Link href="/docs">
          <div className={styles.NavButton}>
            <span className={styles.Label}>Docs</span>
          </div>
        </Link>

        {!loading &&
          (user ? (
            <div >
              <Link href="/profile">
                <div className={styles.NavButton}>
                  <span className={styles.Label}>Client-rendered profile</span>
                </div>
              </Link>

              <Link href="/advanced/ssr-profile">
                <div className={styles.NavButton}>
                  <span className={styles.Label}>Server rendered profile (advanced)</span>
                </div>
              </Link>

              <Link href="/advanced/logout">
                <div className={styles.NavButton}>
                  <span className={styles.Label}>Logout</span>
                </div>
              </Link>

            </div>
          ) : (
            
              <Link href="/api/login">
                <div className={styles.NavButton}>
                  <span className={styles.Label}>Login</span>
                </div>
              </Link>
          ))}
      </div>
    </div>
  )
}

export default NavBar