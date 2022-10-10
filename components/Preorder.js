import { useState, useEffect } from 'react'
import Link from 'next/link'
import Cookies from 'cookies-js'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js/pure'
import { euMember } from 'is-european'
import * as iso3166raw from 'iso-3166'
import { shippingCost, isAllowedCountry } from 'kubesail-shipping'
import piboxModels from 'kubesail-shipping/piboxModels'
import { useTranslation } from 'react-i18next'
import once from 'lodash/once'

import { kubeSailFetch } from '../lib/store'
import contentsMetal from '../public/images/box-contents-metal.jpg'
import contentsAntenna from '../public/images/box-contents-antenna.jpg'
import contentsCm4 from '../public/images/box-contents-cm4.jpg'
import contentsBoards from '../public/images/box-contents-boards.jpg'
import contentsSsd from '../public/images/box-contents-ssd.jpg'
import contentsFan from '../public/images/box-contents-fan.jpg'
import contentsPsuUs from '../public/images/box-contents-psu-us.jpg'
import contentsPsuEu from '../public/images/box-contents-psu-eu.jpg'
// import pibox2Mini from '../public/images/pibox-lcd-logo.jpg'
// import pibox2Mini from '../public/images/pibox-lcd-logo.jpg'
// import pibox2Mini from '../public/images/pibox-lcd-logo.jpg'
// import pibox2Mini from '../public/images/pibox-lcd-logo.jpg'
// import pibox2Mini from '../public/images/pibox-lcd-logo.jpg'
import styles from '../components/Preorder.module.css'

const iso3166 = iso3166raw
  .filter(c => !['UM'].includes(c.alpha2))
  .map(c => {
    if (c.alpha2 === 'GB') c.name = 'United Kingdom'
    if (c.alpha2 === 'TW') c.name = c.name.substring(0, 6)
    if (c.alpha2 === 'US') c.name = c.name.substring(0, 13)
    return c
  })

const Select = dynamic(() => import('react-select'))
const PiBox = dynamic(() => import('../components/PiBox'), { ssr: false })
const Animation = dynamic(() => import('../components/Animation'), { ssr: false })

const KUBESAIL_WWW_TARGET = process.env.NEXT_PUBLIC_KUBESAIL_WWW_TARGET || 'https://kubesail.com'
const PIBOX_WWW_TARGET = process.env.NEXT_PUBLIC_PIBOX_WWW_TARGET || 'https://pibox.io'
const STRIPE_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || 'pk_test_7AkRzftaxjOZWEiGFNy7sPYP'

let stripe

const STOCK_BUFFER = 15

const renderSkuBox = ({ isEU, shippingCountry, sku, small }) => {
  const C_DRIVE_LINKS = (
    <>
      Crucial sells affordable{' '}
      <a target="_blank" href="https://amzn.to/3Own85M">
        2TB
      </a>{' '}
      drives, while Samsung sells drives up to{' '}
      <a target="_blank" href="https://amzn.to/3tQ3ARU">
        8TB
      </a>
    </>
  )
  const C_METAL = {
    img: contentsMetal,
    title: 'Metal Case',
    description:
      'Our industrial and sturdy custom case. Heavy duty 1-mm powder coated steel gives the unit a solid weight and a great feel. Outer dimensions measure ' +
      (shippingCountry === 'US' ? '2x3x5 inches' : '52x79x113 mm'),
  }
  const C_BOARDS = {
    img: contentsBoards,
    title: 'Carrier & Backplane Boards',
    description:
      'Our custom circuit boards for driving the Pi and SATA SSDs, designed in-house and only sold here!',
  }
  const C_CM4 = {
    img: contentsCm4,
    title: 'Raspberry Pi Compute Module 4',
    description: (
      <span>
        The power of Raspberry Pi 4 in a compact form factor.{' '}
        {sku !== '2-bay-hacker' ? (
          `The ${
            sku === '2-bay-standard' ? 'Standard' : 'Plug & Play'
          } PiBox includes a Pi with 8GB RAM,
        8GB flash memory, WiFi & Bluetooth.`
        ) : (
          <span>
            <a target="_blank" href="https://www.raspberrypi.com/products/compute-module-4/">
              Learn more
            </a>{' '}
            or{' '}
            <a target="_blank" href="https://rpilocator.com/?cat=CM4">
              buy now
            </a>
          </span>
        )}
      </span>
    ),
  }
  const C_FAN = {
    img: contentsFan,
    title: 'Premium Noctua Fan',
    description: (
      <span>
        Ultra quiet NF-A4x10 PWM fan. We are serious about cooling, and serious about noise. See our{' '}
        <a target="_blank" href="https://docs.kubesail.com/guides/pibox/os/#stress-test-data">
          stress test results
        </a>
        .
      </span>
    ),
    link: '',
  }
  //TODO change based on country
  const C_PSU = {
    img: isEU ? contentsPsuEu : contentsPsuUs,
    title: (isEU ? 'EU ' : '') + 'Power Supply',
    description: '5v / 3.5A USB-C power supply with inline switch',
    link: '',
  }
  const C_ANTENNA = {
    img: contentsAntenna,
    title: 'CM4 Antenna Kit',
    optional: true,
    description: (
      <span>
        2.4GHz + 5GHz external WiFi & Bluetooth Antenna. Provides a stronger signal to increase your
        wireless speed and range.{' '}
        {sku === '2-bay-hacker' && (
          <a
            target="_blank"
            href="https://www.raspberrypi.com/products/compute-module-4-antenna-kit/"
          >
            Learn more / buy now
          </a>
        )}
      </span>
    ),
  }
  const C_SSD_DIY = {
    img: contentsSsd,
    title: 'Solid State Drive',
    description: (
      <span>
        Add up to two solid state drives. All 2.5-inch SATA SSDs are compatible. Spinning HDDs are
        not recommended due to power requirements. {C_DRIVE_LINKS}
      </span>
    ),
  }
  let included = [C_METAL, C_BOARDS, C_PSU]
  let diy = []
  if (sku === '2-bay-plug-and-play') {
    included.push(C_CM4, C_FAN, C_ANTENNA, {
      img: contentsSsd,
      title: 'Solid State Drive - Bay #1',
      description:
        'The first SSD bay is pre-filled with a 2TB SSD drive, formatted and ready to go. We ship only high quality drives from Samsung or Crucial.',
    })
    diy.push({
      img: contentsSsd,
      title: 'Solid State Drive - Bay #2',
      description: (
        <span>
          Add one additional drive at any time to increase your storage capacity. {C_DRIVE_LINKS}
        </span>
      ),
    })
  } else if (sku === '2-bay-standard') {
    included.push(C_CM4, C_FAN, C_ANTENNA)
    diy.push(C_SSD_DIY)
  } else if (sku === '2-bay-hacker') {
    diy.push(
      C_CM4,
      {
        img: contentsFan,
        title: '40mm Cooling Fan',
        description: (
          <span>
            You can use any 5v 40x40x10mm cooling fan. We recommend the ultra quiet{' '}
            <a target="_blank" href="https://amzn.to/3n8i2Bk">
              Noctua NF-A4x10
            </a>{' '}
            PWM fan.
          </span>
        ),
        link: '',
      },
      C_SSD_DIY,
      C_ANTENNA
    )
  } else {
    return null
  }

  return (
    <>
      <div className={styles.boxContents}>
        <h3>Included in the box</h3>
        <p style={{ textAlign: 'center', margin: 20 }}>These components arrive fully assembled</p>
        <ul>
          {included.map(({ img, title, description }) => (
            <li>
              <img src={img.src} width={small ? 100 : 200} height={small ? 66 : 133} />
              <div>
                <h4>{title}</h4>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.boxContents} style={{ borderTop: '1px solid black' }}>
        <h3>Bring your own</h3>
        <ul>
          {diy.map(({ img, title, description, optional }) => (
            <li>
              <img src={img.src} width={small ? 100 : 200} height={small ? 66 : 133} />
              <div>
                <h4>
                  {title}
                  {optional ? <div className={styles.optional}>OPTIONAL</div> : null}
                </h4>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const trackPurchase = once(() => {
  try {
    rdt('track', 'Purchase')
  } catch (_e) {}
})
const trackLead = once(() => {
  try {
    rdt('track', 'Lead')
  } catch (_e) {}
})

const PreOrder = ({ router, profile, country, page, type }) => {
  country = country || 'US'
  const [sku, setSku] = useState(null)
  const [shippingCountry, setShippingCountry] = useState(country)
  const [inventory, setInventory] = useState({ US: [], EU: [] })
  const [platform, setPlatform] = useState(null)
  const { t } = useTranslation('common')

  useEffect(() => setupStripeKey(), [])
  async function setupStripeKey() {
    stripe = await loadStripe(STRIPE_PUBLIC_KEY)
  }

  useEffect(() => {
    setShippingCountry(country)
  }, [country])

  useEffect(() => fetchInventory(), [])
  async function fetchInventory() {
    try {
      const { body } = await kubeSailFetch('/pibox/inventory')
      if (body.EU && body.US) setInventory(body)
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => fetchPlatform(), [])
  async function fetchPlatform() {
    try {
      if (page !== 'platform') return
      const { body } = await kubeSailFetch(`/platform/${type}`)
      if (body.error) {
        console.error('Unknown platform', { type })
      } else {
        setPlatform(body)
        Cookies.set('PLATFORM_REF', type, {
          expires: new Date(new Date().getTime() + 10 * 365 * 24 * 60 * 60 * 1000),
        })
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async function checkout(sku, country) {
    const platformSlug = Cookies.get('PLATFORM_REF')
    console.log({ platformSlug })
    const sessionRes = await kubeSailFetch(`/pibox/checkout`, {
      method: 'POST',
      body: JSON.stringify({ sku, country, platformSlug }),
    })
    // redirect to stripe
    if (sessionRes.body && sessionRes.body.id) {
      stripe.redirectToCheckout({ sessionId: sessionRes.body.id })
    }
  }

  async function signup({ email, sku, countryCode }) {
    await kubeSailFetch('/pibox/signup', {
      method: 'POST',
      body: JSON.stringify({ email, countryCode, sku, channel: 'pibox.io' }),
    })
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

  const region = shippingCountry === 'US' ? 'US' : 'EU'
  const modelRegionCount = inventory[region].find(i => i.sku === sku)?.count || 0
  const isInStock = modelRegionCount > STOCK_BUFFER

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
    trackPurchase()
    return (
      <div className={styles.Success}>
        <h1>{type === 'waitlist' ? "You're on the waitlist!" : 'Order placed!'}</h1>
        <div style={{ position: 'relative', top: -100 }}>
          <Animation height={700} width={700} animation="warehouse-delivery" />
        </div>
        <div style={{ position: 'relative', top: -220 }}>
          {type === 'waitlist' ? (
            <>You'll get an email as soon as we have information to share. Thanks!</>
          ) : (
            <>
              We will send a followup email when we start production of your PiBox, and also when we
              ship your order.
              <br />
              Thank you for your order!
            </>
          )}
          <div style={{ display: 'flex', margin: '2rem' }}>
            <a target="_blank" href={'https://pibox.io'}>
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
            <a target="_blank" href="https://discord.gg/N3zNdp7jHc" rel="noreferrer nofollow">
              <button>Join us in Discord</button>
            </a>
            <a target="_blank" href="https://twitter.com/KubeSail" rel="noreferrer nofollow">
              <button>Follow us on Twitter</button>
            </a>
          </div>
        </div>
      </div>
    )
  }

  trackLead()

  const notifStyle = {
    border: '1px solid black',
    textAlign: 'center',
    padding: 10,
    borderRadius: 4,
    margin: 5,
  }

  let small = false
  if (typeof window !== 'undefined' && window.innerWidth < 900) {
    small = true
  }

  return (
    <div className={styles.Order}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: 20,
        }}
      >
        <PiBox screen={platform?.logo} noLarge={true} />
        {!small && renderSkuBox({ isEU, shippingCountry, sku })}
      </div>
      <div className={styles.OrderForm}>
        <h2>Pre-Order your PiBox</h2>
        {platform && platform.name !== 'InterestingSoup' && (
          <div>
            <div style={{ textAlign: 'center' }}>
              <Image src={platform.logo} width={120} height={120} />
            </div>
            <div style={notifStyle}>
              {platform.piboxDiscount
                ? `As a ${platform.name} user, your purchase includes a ${
                    platform.piboxDiscount * 100
                  }% discount, up to $30!`
                : `This purchase directly supports the development of ${platform.name}!`}
            </div>
          </div>
        )}
        {/* <div style={notifStyle}>
          {inventory.US < 1 ? (
            <>
              Batch 1 and 2 are in production!
              <h3 style={{ textDecoration: 'none', fontSize: 30, marginBottom: 40 }}>
                Inventory Status
              </h3>
              We are now accepting preorders for Batch 3. Get in line now and cancel at any time.{' '}
              <strong>You won't be charged until we ship.</strong> Our estimated shipping date for
              Batch 3 is the first quarter of 2023, and we will keep you updated via email.
            </>
          ) : inventory < 900 ? (
            <>
              <h4 style={{ marginTop: 0 }}>Batch 1 - Limited Inventory Remaining</h4>
              Batch 1 has <strong>{inventory} units remaining</strong> for preorder. Orders placed
              now will be included in Batch 1, and ship by the end of July. Batch 2 will be
              available in October.
            </>
          ) : (
            <>
              <h4 style={{ marginTop: 0 }}>Batch 1 - Limited Inventory Remaining</h4>
              There are a limited number of units available in the current batch, which ships in
              July. After the first batch is sold out, the next batch will be available in October.
            </>
          )}
        </div> */}
        {isEU && (
          <p>
            <strong>EU Friendly</strong> Shipping. Comes with a{' '}
            <strong>European Power Adapter</strong>.
          </p>
        )}
        <div style={{ position: 'sticky', top: 0, height: 'auto' }}>
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
          {sku && (
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
                        {costData.shippingCost / 100}
                      </div>
                    )}
                    {costData.vat > 0 && (
                      <div>
                        {isoCountry?.name} VAT ({vatAmountPercentHuman}): {currencySymbol}
                        {calculatedVAT}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          )}
          {sku === '5-bay' && (
            <>
              <h2>Coming Soon!</h2>
              <p>
                Enter your email to be notified when the <strong>Full Sized PiBox 5 Bay NAS</strong>{' '}
                is available to order. Full product specifications will be announced later this
                year.
              </p>
            </>
          )}
          {!allowedCountry && (
            <div>
              <p>
                We can't ship to{' '}
                <strong>{iso3166.find(country => country.alpha2 === shippingCountry)?.name}</strong>{' '}
                yet, but we are expanding quickly. Enter your email below and we will let you know
                when we are able to accept your order and ship to your country. Thanks for your
                patience!
              </p>
            </div>
          )}

          {!sku ? null : !allowedCountry || sku === '5-bay' ? (
            <div>
              <form
                name="waitlist"
                onSubmit={async e => {
                  e.preventDefault()
                  const email = document.forms.waitlist.email.value
                  await signup({ email, sku, countryCode: shippingCountry })
                  router.push('/order/success/waitlist')
                }}
              >
                <input
                  name="email"
                  type="email"
                  className={styles.EmailInput}
                  placeholder="Your email address"
                  required
                />
                <input
                  type="submit"
                  className={[styles.checkout].join(' ')}
                  value="Add to Wait List"
                />
              </form>
            </div>
          ) : isInStock ? (
            <>
              <h2>{modelRegionCount - STOCK_BUFFER} In Stock</h2>
              <p>
                We currently have inventory that ships from our {region} warehouse! New orders ship
                within 1 business day.
              </p>
            </>
          ) : (
            <>
              <h2>Sold Out!</h2>
              <p>
                These things are hot! We produce the PiBox in batches, and are now accepting
                preorders for Batch 3. Preorder now and cancel at any time.{' '}
                <strong>You won't be charged until we ship.</strong> Our estimated shipping date for
                Batch 3 is the first quarter of 2023, and we will keep you updated via email.
              </p>
            </>
          )}
          {allowedCountry && sku && sku !== '5-bay' && (
            <button
              className={[styles.checkout].join(' ')}
              onClick={() => checkout(sku, shippingCountry)}
            >
              {isInStock ? 'Checkout' : 'Preorder Now'}
            </button>
          )}
          {small && renderSkuBox({ isEU, shippingCountry, sku, small: true })}
        </div>
      </div>
    </div>
  )
}

export default connect(({ profile, fetchingProfile } = {}) => {
  return { profile, fetchingProfile }
})(withRouter(PreOrder))
