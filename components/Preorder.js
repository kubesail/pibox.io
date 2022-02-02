import { useState } from 'react'
import styles from '../components/Preorder.module.css'
import { connect } from 'react-redux'

const Preorder = ({ profile }) => {
  let email

  const [model, setModel] = useState(null)
  const [saved, setSaved] = useState(false)

  function checkout() {
    window.fetch('https://api.kubesail.com/pibox/checkout', {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ email, model, ram, emmc, wifi, ssds, saved, channel: 'pibox.io' }),
    })
    //redirect to stripe
  }

  if (saved) {
    return (
      <div
        className={styles.Order}
        style={{ margin: '100px auto 400px auto', textAlign: 'center', flexDirection: 'column' }}
      >
        <h2>🎉 You're good to go! 🎉</h2>
        <p>Keep an eye on your inbox for updates. We expect to start shipping this summer!</p>
        <button style={{ margin: '100px 0' }} onClick={() => (window.location = '/')}>
          Go Home
        </button>
      </div>
    )
  }

  return (
    <div className={styles.Order}>
      <img className={styles.ProductImage} src="/images/box-2-mini.png" alt="PiBox 2 mini" />
      <div className={styles.OrderForm}>
        <h2>Pre-Order your PiBox</h2>
        <p>Orders placed now are expected to ship by July 2022. Let's customize your PiBox!</p>
        {/* ===== Model ===== */}
        <h3>Choose your model</h3>
        <div className={styles.Group}>
          <div
            className={[styles.Option, model === 'Standard, 2 Bay' ? styles.Selected : ''].join(
              ' '
            )}
            onClick={() => setModel('Standard, 2 Bay')}
          >
            <div className={styles.OptionHeader}>
              <h4>
                <span className={styles.pink}>Standard PiBox</span>, 2 Bay
              </h4>
              <h4 className={styles.Price}>$299</h4>
            </div>
            <p>- Raspberry Pi CM4 w/ 8GB RAM, 8GB eMMC, WiFi</p>
            <p>- Add up to 2 SATA SSD drives</p>
            <p>- Silent Noctua Fan, 1.3" LCD, WiFi Antenna</p>
            <p>- Black Powder Coated structural steel case</p>
          </div>
          <div
            className={[
              styles.Option,
              model === 'Plug and Play, 2 Bay' ? styles.Selected : '',
            ].join(' ')}
            onClick={() => setModel('Plug and Play, 2 Bay')}
          >
            <div className={styles.OptionHeader}>
              <h4>
                <span className={styles.blue}>Plug+Play PiBox</span>, 2 Bay
              </h4>
              <h4 className={styles.Price}>$499</h4>
            </div>
            <p>- Standard PiBox, plus:</p>
            <p>- One 2TB Samsung QVO SSD Drive</p>
            <p>- Formatted, ready to install apps</p>
            <p>- Additional SATA slot for adding more storage</p>
          </div>

          <div
            className={[styles.Option, model === 'Hacker, 2 Bay' ? styles.Selected : ''].join(' ')}
            onClick={() => setModel('Hacker, 2 Bay')}
          >
            <div className={styles.OptionHeader}>
              <h4>Hacker PiBox, 2 Bay</h4>
              <h4 className={styles.Price}>$199</h4>
            </div>
            <p>- Standard Bundle, but you must provide your own:</p>
            <p>- Fan, Raspberry Pi CM4, and WiFi antenna</p>
          </div>
          <div
            className={[styles.Option, model === 'PiBox, 5 Bay' ? styles.Selected : ''].join(' ')}
            onClick={() => setModel('PiBox, 5 Bay')}
          >
            <div className={styles.OptionHeader}>
              <h4>PiBox, 5 Bay</h4>
              <h4 className={styles.Price}>Coming Soon!</h4>
            </div>
            <p>- 5 Full-Size Hard Drive Bays</p>
            <p>- Full announcement late 2022</p>
          </div>
        </div>

        {model && !profile && (
          <div className={styles.whyLogin}>
            {model === 'PiBox, 5 Bay' ? (
              <p>Log in to reserve your spot in line for the PiBox, 5 Bay Full Sized NAS!</p>
            ) : (
              <p>
                Logging in lets you start setting up apps on your PiBox now so it's ready to use the
                moment it arrives!
              </p>
            )}
            <button
              class={styles.checkout}
              onClick={() => {
                setSaved(true)
              }}
            >
              Login
            </button>
          </div>
        )}
        {model && model !== 'PiBox, 5 Bay' && (
          <button
            class={[styles.checkout, !profile && styles.loggedOut].join(' ')}
            onClick={() => {
              if (!model) {
                return window.alert('Please select a model first')
              }
              checkout()
            }}
          >
            {profile ? `Checkout` : 'Checkout as Guest'}
          </button>
        )}
      </div>
    </div>
  )
}

export default connect(({ profile, fetchingProfile } = {}) => {
  return { profile, fetchingProfile }
})(Preorder)
