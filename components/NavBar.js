import styles from './NavBar.module.css'
import Header from './Header'
import NavButton from './NavButton'

const NavBar = props => {

  const appTitle = `PiBox`;

  return (

    <div className={styles.NavBar}>
      
      <Header appTitle={appTitle} />

      {props.navButtons.map(button => (
        <NavButton
          key={button.path}
          path={button.path}
          label={button.label}
        />
      ))}
    </div>
  )
}

export default NavBar;