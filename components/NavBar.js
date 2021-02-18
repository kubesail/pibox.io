import styles from './NavBar.module.css'
import Header from './Header'
import NavButton from './NavButton'

const NavBar = props => {
  const appTitle = `PiBox`

  return (
    <div className={styles.NavBar}>
      <div className={styles.NavBarWrap}>
        <Header appTitle={appTitle} />
        <div className={styles.NavButtonContainer}>
          {props.navButtons.map(button => (
            <NavButton key={button.path} path={button.path} label={button.label} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NavBar
