import Layout from '../components/Layout'
import Home from '../components/Home'
const { eeaMember, euMember } = require('is-european')
const countryVat = require('country-vat')

const Index = ({ country }) => (
  <Layout>
    <Home country={country} />
  </Layout>
)

export default Index

export async function getServerSideProps(context) {
  const country = context.req.headers['cf-ipcountry']
  res.setHeader('x-your-country', country)
  res.setHeader('x-eea-member', eeaMember(country))
  res.setHeader('x-eu-member', euMember(country))
  res.setHeader('x-your-vat-rate', countryVat(country))

  return {
    props: { country }, // will be passed to the page component as props
  }
}
