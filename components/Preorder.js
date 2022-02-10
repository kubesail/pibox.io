import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../components/Preorder.module.css'
import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { euMember } from 'is-european'
import iso3166 from 'iso-3166'
import { shippingCost, isAllowedCountry } from 'kubesail-shipping'
import Select from 'react-select'

const KUBESAIL_WWW_TARGET = process.env.NEXT_PUBLIC_KUBESAIL_WWW_TARGET || 'https://kubesail.com'
const KUBESAIL_API_TARGET =
  process.env.NEXT_PUBLIC_KUBESAIL_API_TARGET || 'https://api.kubesail.com'
const PIBOX_WWW_TARGET = process.env.NEXT_PUBLIC_PIBOX_WWW_TARGET || 'https://pibox.io'
const STRIPE_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || 'pk_test_7AkRzftaxjOZWEiGFNy7sPYP'

let stripe

const PreOrder = ({ profile, country, page }) => {
  const [model, setModel] = useState(null)
  const [shippingCountry, setShippingCountry] = useState(country)

  useEffect(() => setupStripeKey(), [])
  useEffect(() => {
    try {
      setModel(localStorage.getItem('model'))
    } catch {}
  }, [])
  async function setupStripeKey() {
    stripe = await loadStripe(STRIPE_PUBLIC_KEY)
  }

  useEffect(() => {
    setShippingCountry(country)
  }, [country])

  async function checkout(checkoutModel = model) {
    const sessionRes = await window.fetch(`${KUBESAIL_API_TARGET}/pibox/checkout`, {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ model: checkoutModel, country: shippingCountry }),
    })
    // redirect to stripe
    const session = await sessionRes.json()
    if (session && session.id) {
      stripe.redirectToCheckout({ sessionId: session.id })
    }
  }

  // Store which model user wants in local-storage and retrieve it after they login
  useEffect(() => {
    if (model) {
      try {
        localStorage.setItem('model', model)
      } catch {}
    }
  }, [model])
  if (model && page === 'redirected' && profile) {
    const checkoutModel = localStorage.getItem('model')
    if (checkoutModel && checkoutModel !== 'null') {
      checkout(checkoutModel)
    }
  }

  const models = [
    {
      name: 'Plug and Play, 2 Bay',
      styleName: (
        <>
          <span className={styles.pink}>2 Bay</span> Plug + Play PiBox
        </>
      ),
      priceDollar: 499,
      priceEuro: 499,
      description: [
        'Standard PiBox, plus:',
        'One 2TB Samsung QVO SSD Drive',
        'Formatted, ready to install apps',
        'Additional SATA slot for adding more storage',
      ],
    },
    {
      name: 'Standard, 2 Bay',
      styleName: (
        <>
          <span className={styles.pink}>2 Bay</span> Standard PiBox
        </>
      ),
      priceDollar: 299,
      priceEuro: 299,
      description: [
        'Raspberry Pi CM4 w/ 8GB RAM, 8GB eMMC, WiFi',
        'Add up to 2 SATA SSD drives',
        'Noctua Fan, 1.3" LCD, WiFi Antenna, 3.5A PSU',
        'Black Powder Coated structural steel case',
      ],
    },
    {
      name: 'Hacker, 2 Bay',
      styleName: (
        <>
          <span className={styles.pink}>2 Bay</span> Hacker PiBox
        </>
      ),
      priceDollar: 159,
      priceEuro: 159,
      description: [
        'The Standard PiBox, but you provide your own:',
        'Raspberry Pi CM4, Fan, and WiFi antenna',
      ],
    },
    {
      name: '5 Bay',
      styleName: (
        <>
          <span className={styles.blue}>5 Bay</span> PiBox
        </>
      ),
      description: ['5 Full-Size Hard Drive Bays', 'Product announcement late 2022'],
    },
  ]

  const isoCountry = iso3166.find(c => c.alpha2 === shippingCountry)
  const isEU = isoCountry ? euMember(isoCountry.alpha2) : false

  const currentModel = models.find(m => m.name === model)
  const currentPrice = currentModel ? (isEU ? currentModel.priceEuro : currentModel.priceDollar) : 0

  const costData = shippingCost(shippingCountry)
  const allowedCountry = isAllowedCountry(shippingCountry)

  let currencySymbol = '$'
  switch (costData?.currency) {
    case 'EURO':
      currencySymbol = '€'
      break
    case 'POUND':
      currencySymbol = '£'
      break
  }

  const vatAmountPercentHuman = Math.round((costData?.vat || 0) * 100) + '%'
  const calculatedVAT = Math.round(currentPrice * (costData?.vat || 0))

  return (
    <div className={styles.Order}>
      <img className={styles.ProductImage} src="/images/box-2-mini.png" alt="PiBox 2 mini" />
      <div className={styles.OrderForm}>
        <h2>Pre-Order your PiBox</h2>
        <p>Orders placed now are expected to ship by July 2022. Let's customize your PiBox!</p>
        {isEU && (
          <p>
            <strong>EU Friendly</strong> Shipping. Comes with a{' '}
            <strong>European Power Adapter</strong>.
          </p>
        )}
        <h3>Choose your model</h3>
        <div className={styles.Group}>
          {models.map(m => {
            return (
              <div
                key={m.name}
                className={[styles.Option, model === m.name ? styles.Selected : ''].join(' ')}
                onClick={() => setModel(m.name)}
              >
                <div className={styles.OptionHeader}>
                  <h4>{m.styleName}</h4>
                  <h4 className={styles.Price}>
                    {m.priceDollar ? (
                      <>
                        {currencySymbol}
                        {isEU ? m.priceEuro : m.priceDollar}
                      </>
                    ) : (
                      'Coming soon!'
                    )}
                  </h4>
                </div>
                {m.description.map(d => {
                  return <p key={d}>- {d}</p>
                })}
              </div>
            )
          })}
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

        <div
          style={{
            width: '100%',
            textAlign: 'center',
            color: '#acacac',
          }}
        >
          {allowedCountry ? (
            <div>
              {costData.shippingCost === 0 ? (
                <div>+ Free Shipping to {isoCountry?.name}</div>
              ) : (
                <div>
                  Shipping to {isoCountry?.name}: {currencySymbol}
                  {costData.shippingCost}
                </div>
              )}
              <div>
                {isoCountry?.name} VAT ({vatAmountPercentHuman}): {currencySymbol}
                {calculatedVAT}
              </div>
            </div>
          ) : (
            <div>We don't currently ship to this country, please contact support</div>
          )}
          <div>
            <Select
              onChange={v => setShippingCountry(v.value)}
              options={iso3166.map(country => {
                return { value: country.alpha2, label: country.name }
              })}
              defaultValue={{ value: shippingCountry, label: isoCountry?.name }}
            />
          </div>
        </div>

        {allowedCountry && model && model !== '5 Bay' && (
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
})(PreOrder)
