import styles from './ProdBar.module.css'
import Link from "next/link";
import { useRouter } from "next/router";

const ProdBar = props => {

    const router = useRouter();

  return (

    <div className={styles.ProdBar}>
        <Link href="/box1">
          <a className={router.pathname === '/box1' ? 'active' : 'inactive'}>Box 1</a>
        </Link>
        <Link href="/box2">
          <a className={router.pathname === '/box2' ? 'active' : 'inactive'}>Box 2</a>
        </Link>
        <Link href="/box3">
          <a className={`${router.pathname == '/box3' ? `active` : 'inactive'}`}>Box 3</a>
        </Link>
        <Link href="/box4">
          <a className={router.pathname == '/box4' ? 'active' : 'inactive'}>Box 4</a>
        </Link>
    </div>

  )
}

export default ProdBar;
