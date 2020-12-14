import Link from "next/link";
import Layout from "../components/Layout";
import ProdBar from '../components/ProdBar'
import Image from 'next/image'
import styles from '../components/Box.module.css'

const Box1 = () => (
  <Layout>
    <ProdBar />
    <div className={styles.ProdContent}>
      <div className={styles.ProductImg}>
        <Image
          className={styles.Img}
          src='/images/box1.png'
          alt="Image of Pibox 1"
          width={500}
          height={500}
        />
      </div>
      <div className={styles.ProdContentContainer}>
        <h2>Extra storage in a snap</h2>
        <p>Snap in any <span className={styles.highlight}>Raspberry Pi CM4</span> and <i>two</i> full size 3.5 inch hard drives. Install any operating system and go.</p>
        <button>Order Now</button>
      </div>
      
    </div>
  </Layout>
);

export default Box1;