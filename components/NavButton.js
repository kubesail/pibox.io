import Link from 'next/link'
import { withRouter } from 'next/router'
import styles from './NavButton.module.css'

const NavButton = props => (
  <Link href={props.path}>
    <div className={`${styles.NavButton} ${props.router.pathname === props.path ? 'active' : ''}`}>
      <span className={styles.Label}>{props.label}</span>
    </div>
  </Link>
)

export default withRouter(NavButton)
