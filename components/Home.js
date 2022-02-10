import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../components/Home.module.css'
import 'react-slideshow-image/dist/styles.css'

const models = {
  default: {
    img: '/images/box-2-mini.png',
    line: 'An ultra-modular two or five bay NAS',
  },
  box2mini: {
    img: '/images/box-2-mini.png',
    line: 'A compact two bay NAS for SSDs',
  },
  box5: {
    img: '/images/box-5.png',
    line: 'A five bay NAS for 3.5” Drives',
  },
}

const Home = ({ country = 'Unknown' }) => {
  const [email, setEmail] = useState('')
  const [model, setModel] = useState('default')
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    email && window.localStorage.setItem('email', email)
  }, [email])

  return (
    <div>
      <div className={styles.Product}>
        <div className={[styles.SectionInner]}>
          <div className={styles.ProductContent}>
            <div className={styles.ProductHero}>
              <img className={styles.ProductImage} src={models[model].img} alt="PiBox Render" />
              <div className={styles.divider}></div>
              <div className={styles.ProductBar}>
                <div>
                  <div
                    className={[
                      styles.ProductTab,
                      styles.pinkTab,
                      model === 'box2mini' && styles.ProductTabSelected,
                    ].join(' ')}
                    onClick={() => setModel('box2mini')}
                  >
                    PiBox Mini <span className={styles.colorPink}>2 Bay</span>
                  </div>
                </div>
                <div className={[styles.five].join(' ')}>
                  <div
                    className={[
                      styles.ProductTab,
                      styles.blueTab,
                      model === 'box5' && styles.ProductTabSelected,
                    ].join(' ')}
                    onClick={() => setModel('box5')}
                  >
                    PiBox <span className={styles.colorBlue}>5 Bay</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.ProductContentContainer}>
              <h2 className={styles.HeroHeader}>Extra storage in a snap!</h2>
              <div className={styles.ProductFeatureText}>
                <span> Just add:</span>
                <ul className={styles.ul}>
                  <li>
                    A{' '}
                    <a
                      href="https://www.raspberrypi.org/products/compute-module-4/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Raspberry Pi CM4
                    </a>
                  </li>
                  <li>A few hard drives</li>
                  <li>Any pi supported OS</li>
                </ul>{' '}
                <span>
                  and get the most versatile storage server{' '}
                  <span className={styles.italics}>ever</span>.
                </span>
              </div>
              <Link href="/order">
                <a className={styles.largeButton}>Order Now!</a>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.Section}>
          <div className={[styles.SectionInner, styles.SectionReverse].join(' ')}>
            <div className={styles.SectionCopy}>
              <h3>Operating Systems You Know and Love</h3>
              <div className={[styles.IconContainer, styles.IconsOS].join(' ')}>
                <img
                  className={styles.Icons}
                  src="/images/ubuntu.png"
                  alt="Ubuntu"
                  style={{ marginRight: 30 }}
                />
                <img className={styles.Icons} src="/images/raspberry.png" alt="Raspberry Pi" />
              </div>
              <p className={styles.SectionText}>
                Finally, a NAS that lets you use a standard operating system that you’re used to,
                like Ubuntu or Raspberry Pi OS.
              </p>
            </div>
            <img className={styles.SectionImg} src="/images/gorilla.png" alt="Image of Desktop" />
          </div>
        </div>
        <div className={styles.Section}>
          <div className={styles.SectionInner}>
            <img className={styles.SectionImg} src="/images/lion.png" alt="Image of media" />
            <div className={styles.SectionCopy}>
              <h3>HDMI for Media</h3>
              <div className={[styles.IconContainer, styles.IconsHDMI].join(' ')}>
                <img className={styles.Icons} src="/images/hdmi.png" alt="HDMI Icon" />
              </div>
              <p className={styles.SectionText}>
                PiBox makes a great media center, taking advantage of the Raspberry Pi’s native 4K
                video decoder.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.Section}>
          <div className={[styles.SectionInner, styles.SectionReverse].join(' ')}>
            <div className={styles.SectionCopy}>
              <h3>It’s time to ditch Dropbox, Google Photos, and Netflix</h3>

              <div className={[styles.IconContainer, styles.IconsDitch].join(' ')}>
                <img className={styles.Icons} src="/images/ditch-icons.png" alt="Icon of HDMI" />
              </div>
              <p className={styles.SectionText}>
                PiBox is ready to run a variety of free software.{' '}
                <a target="_blank" rel="noopener noreferrer" href="https://kubesail.com/templates/">
                  Templates
                </a>{' '}
                let you spin up self-hosted apps with one click.
              </p>
            </div>
            <img className={styles.SectionImg} src="/images/nextcloud.png" alt="Image of media" />
          </div>
        </div>

        <div className={styles.SlideShowImg}>
          <img src={'/images/pibox-ssd-removal.png'} className={styles.SlideShowImg} />
        </div>

        <div className={styles.CTA}>
          <Link type="submit" href="/order">
            <a className={styles.largeButton} style={{ maxWidth: 800 }}>
              Order Now
            </a>
          </Link>
        </div>
      </div>

      <div className={styles.SlideShowImg}>
        <img src={'/images/pibox-360-full.gif'} className={styles.SlideShowImg} />
      </div>

      <div className={styles.SlideShowImg}>
        <img src={'/images/pibox-carrier-leaning.png'} className={styles.SlideShowImg} />
      </div>

      {/* <p>You are in {country}</p> */}
    </div>
  )
}

export default Home
