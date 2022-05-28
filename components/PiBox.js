import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import styles from '../components/Home.module.css'
import pibox2Mini from '../public/images/box-2-mini.png'
import pibox5 from '../public/images/box-5.png'

const templateLogos = [
  'https://cdn.kubesail.com/prod/templates/erulabs/NextCloud/2ea6eebb129a.jpg',
  'https://cdn.kubesail.com/prod/templates/erulabs/Plex/3fa892cbcf64.jpg',
  'https://cdn.kubesail.com/prod/templates/loopDelicious/minecraft/bbe0ba482371.jpg',
  'https://cdn.kubesail.com/prod/templates/erulabs/ghost/38b62c96edae.jpg',
  'https://cdn.kubesail.com/prod/templates/erulabs/actual/192bd8a737f7.jpg',
  'https://cdn.kubesail.com/prod/templates/erulabs/Home%20Assistant/f4eed39c7a3d.jpg',
  'https://cdn.kubesail.com/prod/templates/erulabs/jellyfin/a09b251dc153.jpg',
  'https://cdn.kubesail.com/prod/templates/erulabs/PhotoPrism/25c0e06d95a3.jpg',
]

if (typeof window !== 'undefined') {
  window.enableCarousel = true
}

function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t)
  })
}

const PiBox = ({ large, screen }) => {
  const [model, setModel] = useState('box2mini')
  const [template, setTemplate] = useState(0)
  const [fadeIn, setFadeIn] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [fadedOut, setFadedOut] = useState(false)
  const [carouselRunning, setCarouselRunning] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    setTimeout(() => {
      if (!screen) nextTemplate(1)
    }, 2000)
  }, [])

  const nextTemplate = async index => {
    if (!window.enableCarousel) return
    if (carouselRunning) return
    setCarouselRunning(true)
    setFadeOut(true)
    await delay(950)
    setFadedOut(true)
    setFadeOut(false)
    if (index > templateLogos.length - 1) {
      index = 0
    }
    if (index !== template) {
      setTemplate(index)
      await delay(100)
      setFadeIn(true)
      setFadedOut(false)
      await delay(950)
      setFadeIn(false)
    }
    await delay(3000)
    nextTemplate(index + 1)
  }

  return (
    <>
      <div className={styles.ProductHeroContainer}>
        <img
          width={large ? '780px' : '580px'}
          // height={model === 'box2mini' ? 585 : 400}
          alt="PiBox Render"
          src={model === 'box2mini' ? pibox2Mini.src : pibox5.src}
        />
        <div
          className={styles.ProductScreenContainer}
          style={{
            position: 'absolute',
            top: large ? 205 : 158,
            left: large ? 80 : 66,
            zIndex: -1,
            perspective: 242,
            perspective: '1000px',
          }}
        >
          <div
            className={styles.ProductScale}
            style={{
              transform:
                'scaleY(0.50) scaleX(0.47) skewY(12.5deg) rotateZ(354deg) skewX(356deg) rotateY(-5deg)',
              background: 'white',
            }}
          >
            <img
              src={screen || templateLogos[template]}
              height={large ? '240px' : '166px'}
              width={large ? '240px' : '166px'}
              className={
                screen
                  ? styles.fadeIn
                  : [
                      fadeIn && styles.fadeIn,
                      fadeOut && styles.fadeOut,
                      fadedOut && styles.fadedOut,
                    ].filter(Boolean)
              }
            />
          </div>
        </div>
      </div>
      {large && (
        <>
          <div className={styles.divider}></div>
          <div className={styles.ProductBar}>
            <div>
              <div
                className={[
                  styles.ProductTab,
                  styles.pinkTab,
                  model === 'box2mini' && styles.ProductTabSelected,
                ].join(' ')}
                onClick={() => {
                  setModel('box2mini')
                }}
              >
                <div>PiBox</div>
                <div className={[styles.colorPink, styles.weightNormal].join(' ')}>
                  {t('box2-description')}
                </div>
              </div>
            </div>
            <div className={[styles.five].join(' ')}>
              <div
                className={[
                  styles.ProductTab,
                  styles.blueTab,
                  model === 'box5' && styles.ProductTabSelected,
                ].join(' ')}
                onClick={() => {
                  setModel('box5')
                }}
              >
                <div>PiBox</div>
                <span className={[styles.colorBlue, styles.weightNormal].join(' ')}>
                  {t('box5-description')}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default PiBox
