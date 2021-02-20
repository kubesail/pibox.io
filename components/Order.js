import { useState, useEffect } from 'react'
import styles from '../components/Order.module.css'

const Order = () => {
  let email

  if (process.browser) {
    email = window.localStorage.getItem('email')
    if (!email) window.location = '/'
  }

  const [model, setModel] = useState(null)
  const [ram, setRam] = useState(null)
  const [emmc, setEmmc] = useState(null)
  const [wifi, setWifi] = useState(null)
  const [ssds, setSsds] = useState(null)
  const [saved, setSaved] = useState(false)

  const done = model && ram && (ram === 'none' || (emmc && wifi)) && ssds

  useEffect(() => {
    window.fetch('https://api.kubesail.com/pibox/signup', {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ email, model, ram, emmc, wifi, ssds, saved }),
    })
  }, [model, ram, emmc, wifi, ssds, saved])

  if (saved) {
    return (
      <div style={{ margin: '100px auto 400px auto', textAlign: 'center' }}>
        <h2>🎉 You're good to go! 🎉</h2>
        <p>Keep an eye on your inbox for updates. We expect to start shipping this summer!</p>
        <button style={{ margin: '100px' }} onClick={() => (window.location = '/')}>
          Go Home
        </button>
      </div>
    )
  }

  return (
    <div className={styles.Order}>
      <img
        className={styles.ProductImage}
        src="/images/pibox-2-mini-render.png"
        alt="Image of PiBox 1"
      />
      <div className={styles.OrderForm}>
        <h2>You’re on the list!</h2>
        <p>Now let us know which model and options you're interested in.</p>

        {/* ===== Model ===== */}
        <h3>Choose your model</h3>
        <div className={styles.Group}>
          <div
            className={[styles.Option, model === 'Box 2 mini' ? styles.Selected : ''].join(' ')}
            onClick={() => setModel('Box 2 mini')}
          >
            <div className={styles.OptionHeader}>
              <h4>
                Box <span className={styles.pink}>2 mini</span>
              </h4>
              <h4 className={styles.Price}>$100</h4>
            </div>
            <p>- Support for 2 SSD drives.</p>
            <p>- Drives must be 2.5 inch wide</p>
            <p>- Does not support spinning hard drives</p>
          </div>
          <div
            className={[styles.Option, model === 'Box 5 mini' ? styles.Selected : ''].join(' ')}
            onClick={() => setModel('Box 5 mini')}
          >
            <div className={styles.OptionHeader}>
              <h4>
                Box <span className={styles.blue}>5 mini</span>
              </h4>
              <h4 className={styles.Price}>$200</h4>
            </div>
            <p>- Support for 5 SSD drives.</p>
            <p>- Drives must be 2.5 inch wide</p>
            <p>- Does not support spinning hard drives</p>
          </div>
          <div
            className={[styles.Option, model === 'Box 2' ? styles.Selected : ''].join(' ')}
            onClick={() => setModel('Box 2')}
          >
            <div className={styles.OptionHeader}>
              <h4>
                Box <span className={styles.pink}>2</span>
              </h4>
              <h4 className={styles.Price}>$150</h4>
            </div>
            <p>- Supports 2 full size desktop hard drives.</p>
            <p>- Drives must be 3.5 inch wide or use an adapter</p>
          </div>
          <div
            className={[styles.Option, model === 'Box 5' ? styles.Selected : ''].join(' ')}
            onClick={() => setModel('Box 5')}
          >
            <div className={styles.OptionHeader}>
              <h4>
                Box <span className={styles.blue}>5</span>
              </h4>
              <h4 className={styles.Price}>$250</h4>
            </div>
            <p>- Supports 5 full size desktop hard drives.</p>
            <p>- Drives must be 3.5 inch wide or use an adapter</p>
          </div>
        </div>

        {/* ===== RAM ===== */}
        <h3>Choose your Raspberry Pi - Compute Module</h3>
        <div className={styles.Group}>
          <div
            className={[styles.Option, ram === '1GB' ? styles.Selected : ''].join(' ')}
            onClick={() => setRam('1GB')}
          >
            <div className={styles.OptionHeader}>
              <h4>1GB RAM</h4>
              <h4 className={styles.Price}>+$25</h4>
            </div>
            <p>Bare essentials. Best if you plan on using PiBox as a NAS and not much else.</p>
          </div>

          <div
            className={[styles.Option, ram === '2GB' ? styles.Selected : ''].join(' ')}
            onClick={() => setRam('2GB')}
          >
            <div className={styles.OptionHeader}>
              <h4>2GB RAM</h4>
              <h4 className={styles.Price}>+$30</h4>
            </div>
            <p>Capable of running a few apps. For example, Ubuntu w/ Plex Media Server.</p>
          </div>
          <div
            className={[styles.Option, ram === '4GB' ? styles.Selected : ''].join(' ')}
            onClick={() => setRam('4GB')}
          >
            <div className={styles.OptionHeader}>
              <h4>4GB RAM</h4>
              <h4 className={styles.Price}>+$45</h4>
            </div>
            <p>
              A good sweet spot. Can happily run Ubuntu, Kubernetes, Plex, and a few other apps.{' '}
              <b>We recommend this for most customers.</b>
            </p>
          </div>
          <div
            className={[styles.Option, ram === '8GB' ? styles.Selected : ''].join(' ')}
            onClick={() => setRam('8GB')}
          >
            <div className={styles.OptionHeader}>
              <h4>8GB RAM</h4>
              <h4 className={styles.Price}>+$70</h4>
            </div>
            <p>
              To the max! This compute module is the top of the line from Raspberry Pi. You can
              still find high end laptops offered with this much RAM!.
            </p>
          </div>
          <div
            className={[
              styles.Option,
              styles.OptionWide,
              ram === 'none' ? styles.Selected : '',
            ].join(' ')}
            onClick={() => setRam('none')}
          >
            <div className={styles.OptionHeader}>
              <h4>No Raspberry Pi</h4>
              <h4 className={styles.Price}>Free</h4>
            </div>
            <p>You’ll purchase your own Raspberry Pi CM4 separately.</p>
          </div>
        </div>

        {ram && ram !== 'none' && (
          <>
            {/* ===== EMMC ===== */}
            <h3>Choose your Compute Module’s Storage</h3>
            <div className={styles.Group}>
              <div
                className={[styles.Option, emmc === 'none' ? styles.Selected : ''].join(' ')}
                onClick={() => setEmmc('none')}
              >
                <div className={styles.OptionHeader}>
                  <h4>No Flash Storage</h4>
                  <h4 className={styles.Price}>+$0</h4>
                </div>
                <p>
                  Bring your own SD card. Be ok with slower speeds for essentials, like booting the
                  Operating System..
                </p>
              </div>

              <div
                className={[styles.Option, emmc === '8GB' ? styles.Selected : ''].join(' ')}
                onClick={() => setEmmc('8GB')}
              >
                <div className={styles.OptionHeader}>
                  <h4>8GB eMMC</h4>
                  <h4 className={styles.Price}>+$5</h4>
                </div>
                <p>Enough storage for an Operating System, and not much else.</p>
              </div>
              <div
                className={[styles.Option, emmc === '16GB' ? styles.Selected : ''].join(' ')}
                onClick={() => setEmmc('16GB')}
              >
                <div className={styles.OptionHeader}>
                  <h4>16GB eMMC</h4>
                  <h4 className={styles.Price}>+$10</h4>
                </div>
                <p>A happy medium.</p>
              </div>
              <div
                className={[styles.Option, emmc === '32GB' ? styles.Selected : ''].join(' ')}
                onClick={() => setEmmc('32GB')}
              >
                <div className={styles.OptionHeader}>
                  <h4>32GB eMMC</h4>
                  <h4 className={styles.Price}>+$15</h4>
                </div>
                <p>Plenty of space for the OS, and some apps that won't run off the SATA drives.</p>
              </div>
            </div>

            {/* ===== WiFi ===== */}
            <h3>Want WiFi?</h3>
            <div className={styles.Group}>
              <div
                className={[styles.Option, wifi === 'true' ? styles.Selected : ''].join(' ')}
                onClick={() => setWifi('true')}
              >
                <div className={styles.OptionHeader}>
                  <h4>Yes</h4>
                  <h4 className={styles.Price}>+$10</h4>
                </div>
                <p>
                  Good in a pinch, when you don't have access to ethernet. Ideal speeds up to
                  250Mb/s. Includes an external antenna.
                </p>
              </div>

              <div
                className={[styles.Option, wifi === 'false' ? styles.Selected : ''].join(' ')}
                onClick={() => setWifi('false')}
              >
                <div className={styles.OptionHeader}>
                  <h4>No</h4>
                  <h4 className={styles.Price}>Free</h4>
                </div>
                <p>
                  Wired only. You know what you're getting into. This little box will sit right by
                  your router.
                </p>
              </div>
            </div>
          </>
        )}

        {/* ===== SSD ===== */}
        <h3>Choose your Solid State Drives</h3>
        <div className={styles.Group}>
          <div
            className={[styles.Option, ssds === 'none' ? styles.Selected : ''].join(' ')}
            onClick={() => setSsds('none')}
          >
            <div className={styles.OptionHeader}>
              <h4>Diskless</h4>
              <h4 className={styles.Price}>Free</h4>
            </div>
            <p>You'll bring your own Solid State Drives.</p>
          </div>

          <div
            className={[styles.Option, ssds === '250GB' ? styles.Selected : ''].join(' ')}
            onClick={() => setSsds('250GB')}
          >
            <div className={styles.OptionHeader}>
              <h4>250GB x2</h4>
              <h4 className={styles.Price}>+$80</h4>
            </div>
            <p>Two Samsung SSD 860 EVO SATA Drives</p>
            <p>250GB in RAID 1 &mdash; 500GB in RAID 0</p>
          </div>

          <div
            className={[styles.Option, ssds === '1TB' ? styles.Selected : ''].join(' ')}
            onClick={() => setSsds('1TB')}
          >
            <div className={styles.OptionHeader}>
              <h4>1TB x2</h4>
              <h4 className={styles.Price}>+$220</h4>
            </div>
            <p>Two Samsung SSD 860 EVO SATA Drives</p>
            <p>1TB in RAID 1 &mdash; 2TB in RAID 0</p>
          </div>

          <div
            className={[styles.Option, ssds === '2TB' ? styles.Selected : ''].join(' ')}
            onClick={() => setSsds('2TB')}
          >
            <div className={styles.OptionHeader}>
              <h4>2TB x2</h4>
              <h4 className={styles.Price}>+$460</h4>
            </div>
            <p>Two Samsung SSD 860 EVO SATA Drives</p>
            <p>2TB in RAID 1 &mdash; 4TB in RAID 0</p>
          </div>
        </div>
        <button
          class={[styles.save, done ? '' : styles.disabled].join(' ')}
          onClick={() => {
            if (!done) {
              return window.alert('Please finish selecting options')
            }
            setSaved(true)
          }}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default Order
