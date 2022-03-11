import styles from './NavBar.module.css'
import Header from './Header'
import NavButton from './NavButton'
import designedByKubeSail from '../public/images/designed-by-kubesail.svg'

const NavBar = props => {
  return (
    <div className={styles.NavBar}>
      <div className={styles.NavBarWrap}>
        <Header />
        <a href="https://kubesail.com">
          <img src={designedByKubeSail.src} height={31} />
        </a>
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
