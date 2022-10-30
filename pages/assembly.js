import { useState, useEffect } from 'react'
// import Link from 'next/link'
import { withRouter } from 'next/router'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import ReactPlayer from 'react-player/lazy'

// - photo of front panel without sticky 1473 1477
// - photo of front panel with sticky 1474 1475 1476
// - photo of front panel with stick and LCD 1478
// - photo of bottom case without light pipes
// - photo of bottom case with light pipes 1480 1481 1482
// - photo of bottom case, face down, with front panel screwed in
// - photo of correctly aligned screen in screen-window front-on
// - photo of carrier board, without CM4
// - photo of carrier board installed in front panel
// - photo of fan
// - photo of fan installed in top case
// - photo of top case without antenna, back-face visible (such that antenna hole can be highlighted)
// - photo of top case with antenna installed (interior of case)
// - photo of top case with antenna installed (back close up of exterior of case)
// - photo of case top case installed on bottom case
// - photo of packaging empty and ready for pibox
// - photo of packaging complete

const piboxAssembly = {
  title: 'PiBox Assembly Manual',
  author: 'Dan Pastusek',
  contributors: ['Seandon Mooy'],
  intro: {
    description: 'Use this guide to assemble a complete PiBox',
    photo: '',
    tools: [{ name: 'Foo', cost: '$2.99', photo: '' }],
    parts: [{ name: 'Foo', cost: '$2.99', photo: '' }],
  },
  steps: [
    {
      title: 'preparing front panel',
      instructions: [
        { color: '#f00', text: 'Part 1: Prepare the front panel' },
        { color: '#f00', text: 'Part 2: Prepare the front panel' },
      ],
      videos: ['IMG_1455'],
      photos: ['IMG_1477.jpg', 'IMG_1476.jpg'],
      caution: '',
    },
    {
      title: 'installing LCD screen',
      instructions: [],
      videos: ['IMG_1466'],
      photos: ['IMG_1478.jpg'],
      caution: '',
    },
    {
      title: 'light-pipe installation',
      instructions: [],
      videos: ['IMG_1485', 'IMG_1486', 'IMG_1487'],
      photos: ['IMG_1482.jpg', 'IMG_1480.jpg'],
      caution: '',
    },
    {
      title: 'installing front panel',
      instructions: [],
      videos: ['IMG_1492', 'IMG_1013', 'IMG_1488', 'IMG_1490'],
      photos: ['IMG_1491.jpg', 'IMG_1496.jpg', 'IMG_1493.jpg'],
      caution: '',
    },
    {
      title: 'plastic clip into bottom tray',
      instructions: [],
      videos: ['IMG_1014'],
      photos: ['IMG_1498.jpg', 'IMG_1494.jpg', 'IMG_1499.jpg'],
      caution: '',
    },
    // {
    //   title: 'preparing carrier board',
    //   instructions: [],
    //   videos: {
    //     us: 'IMG_1500.MOV',
    //   },
    //   photos: [],
    //   caution: '',
    //   hidden: true,
    // },
    {
      title: 'installing carrier board',
      instructions: [],
      videos: ['IMG_1016', 'IMG_1015', 'IMG_1500'],
      photos: ['IMG_1499.jpg', 'IMG_1502.jpg', 'IMG_1503.jpg', 'IMG_1505.jpg'],
      caution: '',
    },
    {
      title: 'top-case assembly (fan)',
      instructions: [],
      videos: ['IMG_1508', 'IMG_1509', 'IMG_1510', 'IMG_1511', 'IMG_1512', 'IMG_1513'],
      photos: ['IMG_1507.jpg', 'IMG_1515.jpg', 'IMG_1516.jpg', 'IMG_1517.jpg'],
      caution: '',
    },
    {
      title: 'top-case assembly (antenna)',
      instructions: [],
      videos: ['antenna'],
      photos: ['antenna.png', 'IMG_1520.jpg'],
      caution: '',
    },
    {
      title: 'case assembly',
      instructions: [],
      videos: [],
      photos: ['IMG_1522.jpg', 'IMG_1523.jpg', 'IMG_1524.jpg'],
      caution: '',
    },
    {
      title: 'packaging',
      instructions: [],
      videos: [],
      photos: [
        'IMG_1533.jpg',
        'IMG_1534.jpg',
        'IMG_1526.jpg',
        'IMG_1525.jpg',
        'IMG_1528.jpg',
        'IMG_1531.jpg',
        'IMG_1532.jpg',
        'IMG_1541.jpg',
      ],
      caution: '',
    },
  ],
}

const MissingPhoto = (height, width) => {
  return (
    <div style={{ backgroundColor: 'red', height, width, minHeight: '431px', minWidth: '500px' }}>
      Missing photo or video!
    </div>
  )
}

const AssemblyStep = ({ step, stepNumber }) => {
  const [selectedVideo, setSelectedVideo] = useState(step.videos[0])
  const [selectedImage, setSelectedImage] = useState(step.photos[0])
  const [fullScreenImage, setFullScreenImage] = useState(null)
  return (
    <div style={{ borderBottom: '1px solid black', marginBottom: '70px' }}>
      <h1 style={{ fontSize: '24px' }}>
        Step {stepNumber + 1} <span style={{ fontWeight: 500 }}>{step.title || ''}</span>
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <div style={{ width: '50%', minHeight: 400, marginBottom: '30px' }}>
          {fullScreenImage ? (
            <div
              style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                cursor: 'pointer',
                zIndex: 9,
              }}
              onClick={() => setFullScreenImage(null)}
            >
              <Image src={`/assets/${fullScreenImage}`} width="2016" height="1512" />
            </div>
          ) : selectedImage ? (
            <div
              style={{ width: '100%', height: '100%', position: 'relative', cursor: 'pointer' }}
              onClick={() => {
                setFullScreenImage(selectedImage)
              }}
            >
              <Image src={`/assets/${selectedImage}`} width="2016" height="1512" />
            </div>
          ) : selectedVideo ? (
            <ReactPlayer
              controls={true}
              playing={true}
              width={'100%'}
              url={[{ src: `/assets/${selectedVideo}.MOV.webm`, type: 'video/webm' }]}
            />
          ) : (
            <div>No photos or videos?</div>
          )}
        </div>
        <div
          style={{
            width: '50%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          {step.photos.map(photo => {
            return (
              <div
                style={{ cursor: 'pointer', marginLeft: '8px' }}
                onClick={() => {
                  setSelectedVideo(null)
                  setSelectedImage(photo)
                }}
              >
                <Image src={`/assets/${photo}`} width={160} height={120} />
              </div>
            )
          })}
          {step.videos.map((video, i) => {
            return (
              <div
                key={video}
                style={{
                  cursor: 'pointer',
                  marginLeft: '8px',
                  width: 160,
                  height: 120,
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'lightgoldenrodyellow',
                  marginBottom: '8px',
                }}
                onClick={() => {
                  setSelectedImage(null)
                  setSelectedVideo(video)
                }}
              >
                Video #{i + 1}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const AssemblyPage = ({ router, country }) => {
  const [page = '', type = ''] = router?.query?.params || []
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        paddingLeft: '2%',
        paddingRight: '2%',
      }}
    >
      <h1>{piboxAssembly.title}</h1>
      <div style={{ fontSize: '0.8rem' }}>
        By {piboxAssembly.author}{' '}
        {piboxAssembly.contributors.length > 0 ? (
          <span title={`Contributions by ${piboxAssembly.contributors.join(',')}`}>and others</span>
        ) : (
          ''
        )}
      </div>
      {piboxAssembly.steps.map((step, i) => {
        return <AssemblyStep key={step.title} step={step} stepNumber={i} />
      })}
    </div>
  )
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
