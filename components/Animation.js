import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const animations = {
  'warehouse-delivery': '/animations/warehouse-delivery.large.json',
}

let lottie

const Animation = ({
  animation,
  loop,
  autoplay = true,
  control,
  speed,
  preload,
  renderer = 'svg',
  style,
  title,
  className,
  initialSegment,
  width,
  height,
}) => {
  const animationNode = React.useRef()
  const [loadedAnimation, setAnimation] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const loadLottie = async () => {
    if (!lottie) {
      lottie = await import('lottie-web/build/player/lottie_light.min.js')
    }
    return lottie
  }
  useEffect(() => {
    const scrollFunc = () => {
      loadLottie()
    }
    window.addEventListener('scroll', scrollFunc)
    return function cleanup() {
      window.removeEventListener('scroll', scrollFunc)
    }
  }, [])

  useEffect(() => {
    if (preload) loadAnimation()
    else if (inView && !loadedAnimation && !loading) {
      loadAnimation()
    }
  })

  const loadAnimation = async () => {
    if (typeof window === 'undefined' || loading) return
    setLoading(true)
    await loadLottie()
    const animationPath = animations[animation || 'four-oh-four']
    try {
      const newAnim = lottie.loadAnimation({
        container: animationNode.current,
        renderer: renderer,
        loop: typeof loop === 'boolean' ? loop : true,
        autoplay: typeof autoplay === 'boolean' ? autoplay : false,
        path: animationPath,
        initialSegment,
        rendererSettings: { progressiveLoad: true },
      })
      newAnim.addEventListener('data_failed', err => {
        console.error('Lottie Animation failed:', { err })
      })
      if (speed) newAnim.setSpeed(speed)
      if (autoplay) newAnim.play()
      if (control) control(newAnim)
      setAnimation(newAnim)
    } catch (err) {
      console.error(`Failed to play animation!`, {
        animationPath,
        animationFile: animationPath,
        err,
      })
    }
  }

  const { ref, inView } = useInView({ threshold: 0 })

  if (!inView && loadedAnimation?.current) {
    loadedAnimation.pause()
  } else if (inView && loadedAnimation?.current && autoplay) {
    loadedAnimation.play()
  }

  return (
    <div ref={ref} style={{ minHeight: '1px', ...(style || {}) }}>
      <div
        title={title || animation}
        className={`animation ${className || ''}`}
        style={{ minHeight: 10, minWidth: 10, width, height }}
        ref={animationNode}
      />
    </div>
  )
}

export default Animation
