import styles from './ProdBar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ProdBar = props => {
  const router = useRouter()

  return (
    <div className={styles.ProdBar}>
      <div>
        <Link href="/box1">
          <a className={router.pathname === '/box1' ? 'active' : 'inactive'}>
            Box <span className={styles.colorPink}>2</span>
          </a>
        </Link>
        <Link href="/box2">
          <a className={router.pathname === '/box2' ? 'active' : 'inactive'}>
            Box <span className={styles.colorPink}>2 mini</span>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/box3">
          <a className={`${router.pathname == '/box3' ? `active` : 'inactive'}`}>
            Box <span className={styles.colorBlue}>5</span>
          </a>
        </Link>
        <Link href="/box4">
          <a className={router.pathname == '/box4' ? 'active' : 'inactive'}>
            Box <span className={styles.colorBlue}>5 mini</span>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default ProdBar
