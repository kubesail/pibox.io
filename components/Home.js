// import Link from 'next/link'
import Layout from '../components/Layout'
import ProductBar from '../components/ProductBar'
import Image from 'next/image'
import styles from '../components/Home.module.css'

const Index = () => (
  <div className={styles.Product}>
    <div className={styles.FirstDrawer}>
      <div className={styles.ProductContent}>
        <div className={styles.ProductHero}>
          <img
            className={styles.ProductImage}
            src="/images/pibox-2-mini-render.png"
            alt="Image of PiBox 1"
          />
          <ProductBar />
        </div>
        <div className={styles.ProductContentContainer}>
          <h2 className={styles.heroHeader}>Extra storage in a snap</h2>
          <span className={styles.ProductFeatureText}>
            <span> Just add:</span>
            <ul className={styles.ul}>
              <li>
                Any <span className={styles.highlight}>Raspberry Pi CM4</span>
              </li>
              <li>A few hard drives</li>
              <li>Any pi supported OS</li>
            </ul>{' '}
            <span>
              and get the most versatile NAS <span className={styles.italics}>ever</span>.
            </span>
          </span>
          <button>Notify Me</button>
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
)

export default Index
