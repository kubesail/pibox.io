import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import styles from '../components/Home.module.css'
import { Trans, useTranslation } from 'react-i18next'

const PiBox = dynamic(() => import('./PiBox'), { ssr: false })

import piboxBack from '../public/images/back.webp'
import piboxBoards from '../public/images/boards.webp'
import piboxNextCloud from '../public/images/nextcloud.webp'
import ditchIcons from '../public/images/ditch-icons.webp'
import plexDemo from '../public/images/lion.webp'
import ssdRemoval from '../public/images/pibox-ssd-removal.webp'

const Home = () => {
  const [email, setEmail] = useState('')

  const { t } = useTranslation()

  useEffect(() => {
    email && window.localStorage.setItem('email', email)
  }, [email])

  return (
    <div>
      <div className={styles.Product}>
        <div className={[styles.SectionInner]}>
          <div className={styles.ProductContent}>
            <div className={styles.ProductHero}>
              <PiBox large={true} />
            </div>
            <div className={styles.ProductContentContainer}>
              <h2 className={styles.HeroHeader}>{t('hero-header')}</h2>
              <div className={styles.ProductFeatureText}>
                <span>{t('pibox-combines')}</span>
                <ul className={styles.ul}>
                  <li>
                    <Trans i18nKey="raspberry-pi-cm4">
                      A
                      <a
                        href="https://www.raspberrypi.org/products/compute-module-4/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Raspberry Pi CM4
                      </a>
                    </Trans>
                  </li>
                  <li>{t('WiFi, 8GB RAM')}</li>
                  <li>{t('A few hard drives')}</li>
                  <li>{t('app-store')}</li>
                </ul>{' '}
                <span>{t('versatile-storage')}</span>
              </div>
              <Link href="/order">
                <a className={styles.largeButton}>{t('Order Now!')}</a>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.Section}>
          <div className={[styles.SectionInner, styles.SectionReverse].join(' ')}>
            <div className={styles.SectionCopy}>
              <h3>{t('operating-systems')}</h3>
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
              <p className={styles.SectionText}>{t('finally-a-nas')}</p>
            </div>
            <img
              className={styles.SectionImg}
              src="/images/gorilla.webp"
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
              <h3>{t('HDMI for Media')}</h3>
              <div className={[styles.IconContainer, styles.IconsHDMI].join(' ')}>
                <img
                  className={styles.Icons}
                  src="/images/hdmi.png"
                  alt="HDMI Icon"
                  loading="lazy"
                />
              </div>
              <p className={styles.SectionText}>{t('pibox-media-center')}</p>
            </div>
          </div>
        </div>
        <div className={styles.Section}>
          <div className={[styles.SectionInner, styles.SectionReverse].join(' ')}>
            <div className={styles.SectionCopy}>
              <h3>{t('ditch-big-cloud')}</h3>
              <div className={[styles.IconContainer, styles.IconsDitch].join(' ')}>
                <img
                  alt="Ditch icons"
                  loading="lazy"
                  src={ditchIcons.src}
                  className={styles.Icons}
                  width="521px"
                  height="127px"
                />
              </div>
              <p className={styles.SectionText}>
                <Trans i18nKey="pibox-templates-pitch">
                  PiBox is ready to run a variety of free software.
                  <a href="https://kubesail.com/templates/" target="_blank">
                    Templates
                  </a>
                  let you spin up self-hosted apps with one click.
                </Trans>
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
            layout={'intrinsic'}
            alt="PiBox is flexable - add your own SSDs"
            src={piboxBack}
            className={styles.SlideShowImg}
            width={450}
            height={320}
          />
          <Image
            layout={'intrinsic'}
            alt="PiBox Leaning"
            src={piboxBoards}
            className={styles.SlideShowImg}
            width={600}
            height={350}
          />
          <Image
            layout={'intrinsic'}
            alt="PiBox Leaning"
            src={ssdRemoval}
            className={styles.SlideShowImg}
            width={600}
            height={350}
          />
        </div>

        <div className={styles.CTA}>
          <Link href="/order">
            <a className={styles.largeButton} style={{ maxWidth: 800 }}>
              {t('Order Now!')}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
