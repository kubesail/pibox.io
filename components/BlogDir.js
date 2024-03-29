import Head from 'next/head'
import styles from './Blog.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'PiBox Blog'
export const siteTitle = 'PiBox Blog'

export default function Blog({ children, blog }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="PiBox blog directory" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {blog ? (
          <>
            <img
              src="/images/otter.jpg"
              className={`${styles.headerBlogImage} ${utilStyles.borderCircle}`}
              alt={name}
              loading="lazy"
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/otter.jpg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                  loading="lazy"
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!blog && (
        <div className={styles.backToBlog}>
          <Link href="/">
            <a>← Back to Blog</a>
          </Link>
        </div>
      )}
    </div>
  )
}
