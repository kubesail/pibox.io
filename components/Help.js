// import { useState, useEffect } from 'react'
import styles from './Help.module.css'
import { useRouter } from 'next/router'

const Guide = () => {
  const router = useRouter()
  console.log(router)
  const serial = (router.query?.serial || '').replace(/[^A-Z0-9]/gi, '')

  return (
    <div className={styles.Help}>
      <h1>PiBox Help</h1>
      <h2>Serial: {`${serial.substr(0, 3)}-${serial.substr(3, 3)}-${serial.substr(6, 3)}`}</h2>
      <p>
        The quickest way to get help is to email us at{' '}
        <a href={`mailto:support@kubesail.com?subject=PiBox Support [${serial}]`}>
          support@kubesail.com
        </a>{' '}
        or chat with us on <a href="https://kubesail.com/support">Discord</a>. Include your serial
        number when you message us, and we will be able to help you faster. Thanks!
      </p>
    </div>
  )
}

export default Guide
