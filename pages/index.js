// import Link from 'next/link'
import Layout from '../components/Layout'
import ProdBar from '../components/ProdBar'
import Image from 'next/image'
import styles from '../components/Box.module.css'

const Index = () => (
  <Layout>
    <ProdBar />
    <div className={styles.Product}>
      <div className={styles.FirstDrawer}>
        <div className={styles.ProdContent}>
          <div className={styles.ProductImg}>
            <Image
              className={styles.Img}
              src="/images/box1.png"
              alt="Image of PiBox 1"
              width={875}
              height={699}
            />
          </div>
          <div className={styles.ProdContentContainer}>
            <h2>Extra storage in a snap</h2>
            <p>
              Snap in any <span className={styles.highlight}>Raspberry Pi CM4</span> and <i>two</i>{' '}
              full size 3.5 inch hard drives. Install any operating system and go.
            </p>
            <button>Order Now</button>
          </div>
        </div>
      </div>

      <div className={styles.secondDrawer}>
        <div className={styles.secondDrawerContent}>
          <div className={styles.secondDrawerCopy}>
            <h2>A Standard Operating System</h2>
            <div className={styles.IconContainer}>
              <Image
                className={styles.Icons}
                src="/images/ubuntu.png"
                alt="Icon of Ubuntu"
                width={84}
                height={84}
              />
              <Image
                className={styles.Icons}
                src="/images/raspberry.png"
                alt="Icon of Raspberry Pi"
                width={84}
                height={84}
              />
            </div>
            <p>
              The first NAS that lets you use a standard operating system that you’re used to, like
              Ubuntu or Raspberry Pi OS.
            </p>
          </div>
          <div className={styles.DesktopImg}>
            <Image
              className={styles.Img}
              src="/images/gorilla.png"
              alt="Image of Desktop"
              width={583}
              height={303}
            />
          </div>
        </div>
      </div>

      <div className={styles.thirdDrawer}>
        <div className={styles.thirdDrawerContent}>
          <div className={styles.MediaImg}>
            <Image
              className={styles.Img}
              src="/images/lion.png"
              alt="Image of media"
              width={600}
              height={415}
            />
          </div>

          <div className={styles.thirdDrawerCopy}>
            <h2>HDMI for Media</h2>
            <Image
              className={styles.Icons}
              src="/images/hdmi.png"
              alt="Icon of HDMI"
              width={173}
              height={64}
            />
            <p>
              With the Raspberry Pi’s native 4K h.265 native video decoder, the PiBox makes a great
              media center.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.CTA}>
        <button>Order Now</button>
      </div>
    </div>
  </Layout>
)

export default Index
