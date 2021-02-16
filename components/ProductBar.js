import styles from './ProductBar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ProductBar = props => {
  const router = useRouter()

  return (
    <div className={styles.ProdBar}>
      <div className={styles.productGroup}>
        <Link href="/box2">
          <a className={router.pathname === '/box2' ? 'active' : 'inactive'}>
            Box <span className={styles.colorPink}>2</span>
          </a>
        </Link>
        <Link href="/box2mini">
          <a className={router.pathname === '/box2mini' ? 'active' : 'inactive'}>
            Box{' '}
            <span className={styles.colorPink}>
              2 <span className={styles.mini}>mini</span>
            </span>
          </a>
        </Link>
      </div>
      <div className={[styles.productGroup, styles.five].join(' ')}>
        <Link href="/box5">
          <a className={`${router.pathname == '/box5' ? `active` : 'inactive'}`}>
            Box <span className={styles.colorBlue}>5</span>
          </a>
        </Link>
        <Link href="/box5mini">
          <a className={router.pathname == '/box5mini' ? 'active' : 'inactive'}>
            Box{' '}
            <span className={styles.colorBlue}>
              5 <span className={styles.mini}>mini</span>
            </span>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default ProductBar
