import { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { euMember } from 'is-european'
import iso3166 from 'iso-3166'
import { shippingCost, isAllowedCountry } from 'kubesail-shipping'
import Select from 'react-select'
import piboxModels from 'kubesail-shipping/piboxModels'
import { useTranslation } from 'react-i18next'

import { kubeSailFetch } from '../lib/store'
import pibox2Mini from '../public/images/box-2-mini.png'
import styles from '../components/Preorder.module.css'
const Animation = dynamic(() => import('../components/Animation'), { ssr: false })

const KUBESAIL_WWW_TARGET = process.env.NEXT_PUBLIC_KUBESAIL_WWW_TARGET || 'https://kubesail.com'
const PIBOX_WWW_TARGET = process.env.NEXT_PUBLIC_PIBOX_WWW_TARGET || 'https://pibox.io'
const STRIPE_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || 'pk_test_7AkRzftaxjOZWEiGFNy7sPYP'

let stripe

const PreOrder = ({ router, profile, country, page }) => {
  const [sku, setSku] = useState(null)
  const [shippingCountry, setShippingCountry] = useState(country)
  const { t } = useTranslation('common')

  useEffect(() => setupStripeKey(), [])
  async function setupStripeKey() {
    stripe = await loadStripe(STRIPE_PUBLIC_KEY)
  }

  useEffect(() => {
    setShippingCountry(country)
  }, [country])

  async function checkout(sku, country) {
    const sessionRes = await kubeSailFetch(`/pibox/checkout`, {
      method: 'POST',
      body: JSON.stringify({ sku, country }),
    })
    // redirect to stripe
    if (sessionRes.body && sessionRes.body.id) {
      stripe.redirectToCheckout({ sessionId: sessionRes.body.id })
    }
  }

  // Store which model user wants in local-storage and retrieve it after they login
  useEffect(() => {
    if (!sku) return
    if (!shippingCountry) return
    try {
      localStorage.setItem('order-sku', sku)
      localStorage.setItem('order-country', shippingCountry)
    } catch {}
  }, [sku, shippingCountry])

  if (page === 'redirected' && profile) {
    try {
      const sku = localStorage.getItem('order-sku')
      const country = localStorage.getItem('order-country')
      router.replace('/order')
      checkout(sku, country)
    } catch {}
  }

  const isoCountry = iso3166.find(c => c.alpha2 === shippingCountry)
  const isEU = isoCountry ? euMember(isoCountry.alpha2) : false

  const currentModel = piboxModels.find(m => m.sku === sku)
  const costData = shippingCost(shippingCountry)
  const allowedCountry = isAllowedCountry(shippingCountry)

  const currentPrice = currentModel?.price ? currentModel.price[costData?.currency] : 0

  let currencySymbol = '$'
  switch (costData?.currency) {
    case 'EUR':
      currencySymbol = '€'
      break
    case 'GBP':
      currencySymbol = '£'
      break
  }

  const vatAmountPercentHuman = Math.round((costData?.vat || 0) * 100) + '%'
  const calculatedVAT = Math.round(currentPrice * (costData?.vat || 0)) / 100

  if (page === 'success') {
    return (
      <div className={styles.Success}>
        <h1>Order placed!</h1>
        <div style={{ position: 'relative', top: -100 }}>
          <Animation height={700} width={700} animation="warehouse-delivery" />
        </div>
        <div style={{ position: 'relative', top: -220 }}>
          We will send a followup email when we start production of your PiBox, and also when we
          ship your order.
          <br />
          Thank you for your order!
          <div style={{ display: 'flex', margin: '2rem' }}>
            <a href={'https://pibox.io'}>
              <button>Back to PiBox.io</button>
            </a>
            <a
              href="https://kubesail.com"
              rel="nofollow"
              target="_blank"
              title="Visit KubeSail.com"
            >
              <button>Visit KubeSail.com</button>
            </a>
            <a href="https://discord.gg/N3zNdp7jHc" rel="noreferrer nofollow" target="_blank">
              <button>Join us in Discord</button>
            </a>
            <a href="https://twitter.com/KubeSail" rel="noreferrer nofollow" target="_blank">
              <button>Follow us on Twitter</button>
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.Order}>
      <Image alt="PiBox 2 mini" src={pibox2Mini} height={345} width={533} />
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
          {piboxModels.map(m => {
            return (
              <div
                key={m.sku}
                className={[styles.Option, sku === m.sku ? styles.Selected : ''].join(' ')}
                onClick={() => setSku(m.sku)}
              >
                <div className={styles.OptionHeader}>
                  <h4>
                    <span className={m.bays === 2 ? styles.pink : styles.blue}>{m.bays} Bay</span>{' '}
                    {m.shortName}
                  </h4>
                  <h4 className={styles.Price}>
                    {m.price ? (
                      <>
                        {currencySymbol}
                        {m.price[costData.currency] / 100}
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

        {sku && sku !== '5-bay' && (
          <div className={styles.country}>
            <div className={styles.countrySelect}>
              <div>Shipping Country:</div>
              <Select
                id="country"
                onChange={v => setShippingCountry(v.value)}
                options={iso3166.map(country => {
                  return { value: country.alpha2, label: country.name }
                })}
                defaultValue={{ value: shippingCountry, label: isoCountry?.name }}
              />
            </div>
            <div className={styles.countryDetails}>
              {allowedCountry ? (
                <div>
                  {costData.shippingCost[0] === 0 ? (
                    <strong>Free Shipping</strong>
                  ) : (
                    <div>
                      Shipping to {isoCountry?.name}: {currencySymbol}
                      {Math.round(costData.shippingCost / 100)}
                    </div>
                  )}
                  {costData.vat > 0 && (
                    <div>
                      {isoCountry?.name} VAT ({vatAmountPercentHuman}): {currencySymbol}
                      {calculatedVAT}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  Please contact <a href="mailto:support@pibox.io">support@pibox.io</a> for shipping
                  options to your country
                </div>
              )}
            </div>
          </div>
        )}

        {sku && !profile && (
          <div>
            {sku === '5-bay' ? (
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

        {allowedCountry && sku && sku !== '5-bay' && (
          <button
            className={[styles.checkout, !profile && styles.loggedOut].join(' ')}
            onClick={() => checkout(sku, shippingCountry)}
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
})(withRouter(PreOrder))
