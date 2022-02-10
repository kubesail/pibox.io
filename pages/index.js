import Layout from '../components/Layout'
import Home from '../components/Home'

const Index = ({ country }) => (
  <Layout>
    <Home country={country} />
  </Layout>
)

export default Index

export async function getServerSideProps(context) {
  const country = context.req.headers['cf-ipcountry']

  return {
    props: { country }, // will be passed to the page component as props
  }
}
