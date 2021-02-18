// import Link from 'next/link'
import { useState, useEffect } from 'react'
import ProductBar from '../components/ProductBar'
import Image from 'next/image'
import styles from '../components/Home.module.css'

const signup = email => {
  window.fetch('https://api.kubesail.com/pibox/signup', {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ email }),
  })
  window.location = '/prefs'
}

const Home = () => {
  const [email, setEmail] = useState('')

  useEffect(() => {
    window.localStorage.setItem('email', email)
  }, [email])

  return (
    <div>
      <div className={styles.Product}>
        <div className={[styles.SectionInner]}>
          <div className={styles.ProductContent}>
            <div className={styles.ProductHero}>
              <img
                className={styles.ProductImage}
                src="/images/pibox-2-mini-render.png"
                alt="Image of PiBox 1"
              />
              <div className={styles.tagline}>An ultra modular two or five bay NAS</div>
              <div className={styles.divider}></div>
              <ProductBar />
            </div>
            <div className={styles.ProductContentContainer}>
              <h2 className={styles.HeroHeader}>Extra storage in a snap</h2>
              <div className={styles.ProductFeatureText}>
                <span> Just add:</span>
                <ul className={styles.ul}>
                  <li>
                    Any{' '}
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
                  and get the most versatile NAS <span className={styles.italics}>ever</span>.
                </span>
              </div>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  signup(email)
                }}
              >
                <input
                  className={styles.EmailInput}
                  type="email"
                  required
                  placeholder="Enter your email"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
                <input type="submit" value="Notify Me"></input>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.Section}>
          <div className={[styles.SectionInner]}>
            <div className={styles.SectionCopy}>
              <h2>Operating Systems You Know and Love</h2>
              <div className={styles.IconContainer}>
                <img
                  className={styles.Icons}
                  src="/images/ubuntu.png"
                  alt="Icon of Ubuntu"
                  width={84}
                  height={84}
                />
                <img
                  className={styles.Icons}
                  src="/images/raspberry.png"
                  alt="Icon of Raspberry Pi"
                  width={66}
                  height={84}
                />
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
              <h2>HDMI for Media</h2>
              <Image
                className={styles.Icons}
                src="/images/hdmi.png"
                alt="Icon of HDMI"
                width={173}
                height={64}
              />
              <p className={styles.SectionText}>
                The PiBox makes a great media center, taking advantage of the Raspberry Pi’s native
                4K video decoder.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.Section}>
          <div className={styles.SectionInner}>
            <div className={styles.SectionCopy}>
              <h2>It’s time to ditch Dropbox, Google Photos, and Netflix</h2>
              <img
                className={styles.Icons}
                src="/images/ditch-icons.png"
                alt="Icon of HDMI"
                style={{ width: '100%' }}
              />
              <p className={styles.SectionText}>
                The PiBox is ready to run a variety of free sofware.{' '}
                <a target="_blank" rel="noopener noreferrer" href="https://kubesail.com/templates/">
                  KubeSail templates
                </a>{' '}
                let you spin up self-hosted apps with one click.
              </p>
            </div>
            <img className={styles.SectionImg} src="/images/nextcloud.png" alt="Image of media" />
          </div>
        </div>

        <div className={styles.CTA}>
          <form
            onSubmit={e => {
              e.preventDefault()
              signup(email)
            }}
          >
            <input
              className={styles.EmailInput}
              type="email"
              required
              placeholder="Enter your email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <input type="submit" value="Notify Me"></input>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home
