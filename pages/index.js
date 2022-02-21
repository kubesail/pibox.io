import Layout from '../components/Layout'
import Home from '../components/Home'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Index = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export default Index

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'footer'])),
  },
})
