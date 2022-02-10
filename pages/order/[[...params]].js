// import Link from 'next/link'
import Layout from '../../components/Layout'
import Preorder from '../../components/Preorder'
import { withRouter } from 'next/router'

const PreOrderPage = ({ router, country }) => {
  const [page = ''] = router?.query?.params || []
  return (
    <Layout>
      <Preorder page={page} country={country} />
    </Layout>
  )
}

export default withRouter(PreOrderPage)

export async function getServerSideProps(context) {
  const country = context.req.headers['cf-ipcountry'] || 'US'
  return { props: { country } }
}
