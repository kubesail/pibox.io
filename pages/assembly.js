// import Link from 'next/link'
import { withRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const assemblySteps = [
  {
    title: 'preparing front panel',
    video: {
      us: 'http://136.244.55.110:9342/IMG_1455.MOV',
    },
  },
  {
    title: 'installing LCD screen',
    video: {
      us: 'http://136.244.55.110:9342/IMG_1466%202.MOV',
    },
  },
  {
    title: 'LCD screen quality check',
    video: {},
  },
  {
    title: 'installing front panel',
    video: {
      us: 'http://136.244.55.110:9342/IMG_1013.MOV',
    },
  },
  {
    title: 'plastic clip into bottom tray',
    video: {
      us: 'http://136.244.55.110:9342/IMG_1014.MOV',
    },
  },
  {
    title: 'installing carrier board',
    video: {
      // http://136.244.55.110:9342/IMG_1016%202.MOV // shorter clip
      us: 'http://136.244.55.110:9342/IMG_1015%202.MOV',
    },
  },
]

const AssemblyPage = ({ router, country }) => {
  const [page = '', type = ''] = router?.query?.params || []
  return <div></div>
}

export default withRouter(AssemblyPage)

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
