import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../components/Preorder.module.css'
import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'

const KUBESAIL_WWW_TARGET = process.env.NEXT_PUBLIC_KUBESAIL_WWW_TARGET
const KUBESAIL_API_TARGET = process.env.NEXT_PUBLIC_KUBESAIL_API_TARGET
const PIBOX_WWW_TARGET = process.env.NEXT_PUBLIC_PIBOX_WWW_TARGET

let stripe

const inEU = () => {
  return true
}

const Preorder = ({ profile, page }) => {
  const [model, setModel] = useState(null)
  console.log({ model })

  useEffect(() => setupStripeKey(), [])
  useEffect(() => {
    try {
      setModel(localStorage.getItem('model'))
    } catch {}
  }, [])
  async function setupStripeKey() {
    stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  }

  async function checkout(checkoutModel = model) {
    const sessionRes = await window.fetch(`${KUBESAIL_API_TARGET}/pibox/checkout`, {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ model: checkoutModel }),
    })
    //redirect to stripe

    const session = await sessionRes.json()
    stripe.redirectToCheckout({ sessionId: session.id })
  }

  // Store which model user wants in localstorage and retrieve it after they login
  useEffect(() => {
    try {
      localStorage.setItem('model', model)
    } catch {}
  }, [model])
  if (model && page === 'redirected' && profile) {
    const checkoutModel = localStorage.getItem('model')
    console.log({ checkoutModel })
    if (checkoutModel) {
      checkout(checkoutModel)
    }
  }

  return (
    <div className={styles.Order}>
      <img className={styles.ProductImage} src="/images/box-2-mini.png" alt="PiBox 2 mini" />
      <div className={styles.OrderForm}>
        <h2>Pre-Order your PiBox</h2>
        <p>Orders placed now are expected to ship by July 2022. Let's customize your PiBox!</p>
        {inEU() && (
          <p>
            <strong>EU Friendly</strong> Shipping. <strong>VAT</strong> Included. Comes with a{' '}
            <strong>European Power Adapter</strong>.
          </p>
        )}
        <h3>Choose your model</h3>
        <div className={styles.Group}>
          <div
            className={[
              styles.Option,
              model === 'Plug and Play, 2 Bay' ? styles.Selected : '',
            ].join(' ')}
            onClick={() => setModel('Plug and Play, 2 Bay')}
          >
            <div className={styles.OptionHeader}>
              <h4>
                <span className={styles.pink}>2 Bay</span> Plug+Play PiBox
              </h4>
              <h4 className={styles.Price}>{inEU() ? '€499' : '$499'}</h4>
            </div>
            <p>- Standard PiBox, plus:</p>
            <p>- One 2TB Samsung QVO SSD Drive</p>
            <p>- Formatted, ready to install apps</p>
            <p>- Additional SATA slot for adding more storage</p>
          </div>
          <div
            className={[styles.Option, model === 'Standard, 2 Bay' ? styles.Selected : ''].join(
              ' '
            )}
            onClick={() => setModel('Standard, 2 Bay')}
          >
            <div className={styles.OptionHeader}>
              <h4>
                <span className={styles.pink}>2 Bay</span> Standard PiBox
              </h4>
              <h4 className={styles.Price}>{inEU() ? '€299' : '$299'}</h4>
            </div>
            <p>- Raspberry Pi CM4 w/ 8GB RAM, 8GB eMMC, WiFi</p>
            <p>- Add up to 2 SATA SSD drives</p>
            <p>- Noctua Fan, 1.3" LCD, WiFi Antenna, 3.5A PSU</p>
            <p>- Black Powder Coated structural steel case</p>
          </div>
          <div
            className={[styles.Option, model === 'Hacker, 2 Bay' ? styles.Selected : ''].join(' ')}
            onClick={() => setModel('Hacker, 2 Bay')}
          >
            <div className={styles.OptionHeader}>
              <h4>
                <span className={styles.pink}>2 Bay</span> Hacker PiBox
              </h4>
              <h4 className={styles.Price}>{inEU() ? '€159' : '$159'}</h4>
            </div>
            <p>- The Standard PiBox, but you provide your own:</p>
            <p>- Raspberry Pi CM4, Fan, and WiFi antenna</p>
          </div>
          <div
            className={[styles.Option, model === '5 Bay' ? styles.Selected : ''].join(' ')}
            onClick={() => setModel('5 Bay')}
          >
            <div className={styles.OptionHeader}>
              <h4>
                <span className={styles.blue}>5 Bay</span> PiBox
              </h4>
              <h4 className={styles.Price}>Coming Soon!</h4>
            </div>
            <p>- 5 Full-Size Hard Drive Bays</p>
            <p>- Product announcement late 2022</p>
          </div>
        </div>

        {model && !profile && (
          <div>
            {model === '5 Bay' ? (
              <p>
                Log in to reserve your spot in line for the{' '}
                <strong>Full Sized PiBox 5 Bay NAS</strong>. Full product specifications will be
                announced later this year.
              </p>
            ) : (
              <p className={styles.whyLogin}>
                Logging in lets you start setting up apps on your PiBox now, so it's{' '}
                <strong>ready to use</strong> the moment it arrives!
              </p>
            )}
            <Link
              href={`${KUBESAIL_WWW_TARGET}/login?redirect=${encodeURIComponent(
                `${PIBOX_WWW_TARGET}/order/redirected`
              )}`}
            >
              <a className={styles.checkout}>Login</a>
            </Link>
          </div>
        )}
        {model && model !== '5 Bay' && (
          <button
            className={[styles.checkout, !profile && styles.loggedOut].join(' ')}
            onClick={() => checkout()}
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
