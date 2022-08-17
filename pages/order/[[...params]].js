// import Link from 'next/link'
import Layout from '../../components/Layout'
import Preorder from '../../components/Preorder'
import { withRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const PreOrderPage = ({ router, country }) => {
  const [page = '', type = ''] = router?.query?.params || []
  return (
    <Layout>
      <Preorder page={page} type={type} country={country} />
    </Layout>
  )
}

export default withRouter(PreOrderPage)

export async function getServerSideProps({ req, res }) {
  const country = req.headers['cf-ipcountry'] || 'US'
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=59')
  res.setHeader('X-PiBox-Country', country)
  res.setHeader('X-PiBox-Locale', locale)
  const sst = await serverSideTranslations(locale, ['common', 'footer'])
  console.log({ sst })
  return {
    props: {
      country,
      ...sst,
    },
  }
}
