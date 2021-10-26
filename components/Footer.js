import styles from './Footer.module.css'

const Footer = props => {
  return (
    <div className={styles.FooterWrap}>
      <div className={styles.Footer}>
        <p>
          PiBox is a product in active &amp; open development by{' '}
          <a href="https://kubesail.com">KubeSail, Inc</a>.
        </p>
        <p>
          The PiBox is designed for hackers, tinkerers, and self-hosters, and does not require the
          use of KubeSail software to operate.
        </p>
        {/* <p>While some components can not be open sourced due to vendor requests, most will be.</p> */}
        <p>
          Use of this site constitutes agreement to the KubeSail{' '}
          <a href="https://kubesail.com/terms">terms of service</a> and{' '}
          <a href="https://kubesail.com/privacy">privacy policy</a>.
        </p>
      </div>
    </div>
  )
}

export default Footer
