import { useState } from 'react'

// YouTube facade: loads the real thumbnail first; the iframe only loads on click.
export default function VideoCard({ film, ratio = '16/10', autoplay = false, onLoad }) {
  const [play, setPlay] = useState(false)
  const shouldPlay = autoplay || play
  const embedSrc = `https://www.youtube-nocookie.com/embed/${film.id}?autoplay=1&mute=${autoplay ? 1 : 0}&controls=${autoplay ? 0 : 1}&playsinline=1&modestbranding=1&rel=0${autoplay ? `&loop=1&playlist=${film.id}&iv_load_policy=3&disablekb=1&fs=0` : ''}`
  return (
    <figure className={`vcard ${autoplay ? 'vcard--autoplay' : ''}`} style={{ aspectRatio: ratio }}>
      {shouldPlay ? (
        <iframe
          src={embedSrc}
          title={film.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading={autoplay ? 'eager' : 'lazy'}
          onLoad={onLoad}
        />
      ) : (
        <button className="vcard__facade" onClick={() => setPlay(true)} aria-label={`Play film: ${film.title}`}>
          <img src={film.poster} alt={`${film.title} — poster frame`} loading="lazy" />
          <span className="vcard__play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
            <i className="vcard__ring" />
          </span>
          <span className="vcard__rec" aria-hidden="true">● REC</span>
        </button>
      )}
      {!autoplay && (
        <figcaption className="ph-cap">
          <span>{film.title}</span>
          <span>{film.tag}</span>
        </figcaption>
      )}
    </figure>
  )
}
