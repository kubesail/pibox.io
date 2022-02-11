import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../components/Home.module.css'
import 'react-slideshow-image/dist/styles.css'

import pibox2Mini from '../public/images/box-2-mini.png'
import pibox5 from '../public/images/box-5.png'
import piboxSpinning from '../public/images/pibox-360-full.gif'
import piboxLeaning from '../public/images/pibox-carrier-leaning.png'
import piboxSSDRemoval from '../public/images/pibox-ssd-removal.png'
import piboxNextCloud from '../public/images/nextcloud.png'
import ditchIcons from '../public/images/ditch-icons.png'
import plexDemo from '../public/images/lion.png'

const Home = () => {
  const [email, setEmail] = useState('')
  const [model, setModel] = useState('box2mini')
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
              <Image
                layout={'responsive'}
                alt="PiBox Render"
                src={model === 'box2mini' ? pibox2Mini : pibox5}
              />
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
                  loading="lazy"
                />
                <img
                  className={styles.Icons}
                  src="/images/raspberry.png"
                  alt="Raspberry Pi"
                  loading="lazy"
                />
              </div>
              <p className={styles.SectionText}>
                Finally, a NAS that lets you use a standard operating system that you’re used to,
                like Ubuntu or Raspberry Pi OS.
              </p>
            </div>
            <img
              className={styles.SectionImg}
              src="/images/gorilla.png"
              alt="Image of Desktop"
              loading="lazy"
            />
          </div>
        </div>
        <div className={styles.Section}>
          <div className={styles.SectionInner}>
            <Image
              width={600}
              height={415}
              alt="PiBox can run Home-Media software like Plex and JellyFin without a sweat!"
              src={plexDemo}
              className={styles.SectionImg}
            />
            <div className={styles.SectionCopy}>
              <h3>HDMI for Media</h3>
              <div className={[styles.IconContainer, styles.IconsHDMI].join(' ')}>
                <img
                  className={styles.Icons}
                  src="/images/hdmi.png"
                  alt="HDMI Icon"
                  loading="lazy"
                />
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
                <Image
                  alt="Icon of HDMI"
                  src={ditchIcons}
                  className={styles.Icons}
                  width={1035}
                  height={252}
                />
              </div>
              <p className={styles.SectionText}>
                PiBox is ready to run a variety of free software.{' '}
                <a target="_blank" rel="noopener noreferrer" href="https://kubesail.com/templates/">
                  Templates
                </a>{' '}
                let you spin up self-hosted apps with one click.
              </p>
            </div>
            <Image
              width={620}
              height={450}
              alt="PiBox can run loads of software, like NextCloud!"
              src={piboxNextCloud}
              className={styles.SectionImg}
            />
          </div>
        </div>

        <div className={styles.SlideShowImg}>
          <Image
            layout={'responsive'}
            alt="PiBox is flexable - add your own SSDs"
            src={piboxSSDRemoval}
            className={styles.SlideShowImg}
          />
        </div>

        <div className={styles.CTA}>
          <Link href="/order">
            <a className={styles.largeButton} style={{ maxWidth: 800 }}>
              Order Now
            </a>
          </Link>
        </div>
      </div>

      <div className={styles.SlideShowImg}>
        <Image
          layout={'responsive'}
          alt="PiBox Spinning"
          src={piboxSpinning}
          className={styles.SlideShowImg}
        />
      </div>

      <div className={styles.SlideShowImg}>
        <Image
          layout={'responsive'}
          alt="PiBox Leaning"
          src={piboxLeaning}
          className={styles.SlideShowImg}
        />
      </div>

      {/* <p>You are in {country}</p> */}
    </div>
  )
}

export default Home
