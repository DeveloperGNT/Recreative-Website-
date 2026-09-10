import { useEffect, useState } from 'react'

export default function LoadingBuffer() {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let current = 0
    let finishTimer
    const progressTimer = window.setInterval(() => {
      current = Math.min(current + Math.ceil((99 - current) / 7), 99)
      setProgress(current)
    }, 90)

    const finish = () => {
      window.clearInterval(progressTimer)
      setProgress(100)
      finishTimer = window.setTimeout(() => setReady(true), 260)
    }

    if (document.readyState === 'complete') {
      finishTimer = window.setTimeout(finish, 180)
    } else {
      window.addEventListener('load', finish, { once: true })
      finishTimer = window.setTimeout(finish, 2400)
    }

    return () => {
      window.clearInterval(progressTimer)
      window.clearTimeout(finishTimer)
      window.removeEventListener('load', finish)
    }
  }, [])

  return (
    <div className={`model-buffer ${ready ? 'is-ready' : ''}`} aria-hidden={ready}>
      <div className="model-buffer__inner">
        <div className="model-buffer__mark">
          <img src="/ReCreative-Logo-og.webp" alt="" width="72" height="72" />
        </div>
        <p className="model-buffer__eyebrow">ReCreative studio</p>
        <h2>Preparing the view.</h2>
        <p className="model-buffer__status">Loading the interactive camera experience</p>
        <div className="model-buffer__track" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="model-buffer__meta"><span>Initialising 3D scene</span><b>{progress}%</b></div>
      </div>
    </div>
  )
}
