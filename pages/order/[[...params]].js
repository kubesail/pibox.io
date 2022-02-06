// import Link from 'next/link'
import Layout from '../../components/Layout'
import Preorder from '../../components/Preorder'
import { withRouter } from 'next/router'

const Prefs = ({ router }) => {
  const [page = ''] = router?.query?.params || []
  return (
    <Layout>
      <Preorder page={page} />
    </Layout>
  )
}

export default withRouter(Prefs)
