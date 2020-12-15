import Link from 'next/link'
import Layout from '../components/Layout'
import ProdBar from '../components/ProdBar'
import styles from '../components/Box.module.css'

const Box3 = () => (
  <Layout>
    <ProdBar />
    <br />
    <div className={styles.ProdContent}>
      <Link href="/">
        <a> Take me home</a>
      </Link>
      <p>I am Box 3</p>
    </div>
  </Layout>
)

export default Box3
