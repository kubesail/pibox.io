// import Link from 'next/link'
import Layout from '../../components/Layout'
import Preorder from '../../components/Preorder'
import { withRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const PreOrderPage = ({ router, country }) => {
  const [page = ''] = router?.query?.params || []
  return (
    <Layout>
      <Preorder page={page} country={country} />
    </Layout>
  )
}

export default withRouter(PreOrderPage)

export async function getServerSideProps({ req, res, locale }) {
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=59')
  const country = req.headers['cf-ipcountry'] || 'US'
  return {
    props: {
      country,
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  }
}
