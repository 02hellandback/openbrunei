import React, { useEffect, useRef, useState } from 'react'

const MAPCN_SDK = 'https://map.cn/api.js'

function loadMapCNSDK(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.MapCN) return resolve()
    let pollTimer
    const start = Date.now()

    function poll() {
      if (window.MapCN) {
        clearInterval(pollTimer)
        return resolve()
      }
      if (Date.now() - start > timeout) {
        clearInterval(pollTimer)
        return reject(new Error('MapCN global not available'))
      }
    }

    pollTimer = setInterval(poll, 150)

    const exists = Array.from(document.scripts).some(s => s.src === url)
    if (exists) return

    const s = document.createElement('script')
    s.src = url
    s.async = true
    s.onload = () => {}
    s.onerror = () => {
      clearInterval(pollTimer)
      reject(new Error('Failed to load MapCN SDK'))
    }
    document.head.appendChild(s)
  })
}

export default function MapCNMap({ center = [4.9031, 114.9398], zoom = 12 }) {
  const ref = useRef(null)
  const [status, setStatus] = useState('Loading MapCN...')

  useEffect(() => {
    let mounted = true
    let map = null

    async function init() {
      try {
        setStatus('Initializing MapCN...')
        await loadMapCNSDK(MAPCN_SDK)
        if (!mounted) return
        if (window.MapCN && typeof window.MapCN.Map === 'function') {
          // MapCN.Map likely expects [lat, lng] in original app; detect by trying both
          try {
            map = new window.MapCN.Map(ref.current, { center: [center[1], center[0]], zoom })
          } catch (e) {
            map = new window.MapCN.Map(ref.current, { center: [center[0], center[1]], zoom })
          }
          if (map && typeof map.addMarker === 'function') {
            // try adding marker using same coordinate order
            try {
              map.addMarker({ position: [4.8897, 114.9414], label: 'Omar Ali Saifuddien Mosque' })
            } catch (_) {
              try {
                map.addMarker({ position: [114.9414, 4.8897], label: 'Omar Ali Saifuddien Mosque' })
              } catch (__) {
                // ignore
              }
            }
          }
          ref.current.classList.add('has-map')
          setStatus('MapCN loaded')
        } else {
          setStatus('MapCN SDK loaded but API not found')
        }
      } catch (err) {
        setStatus('Failed to load MapCN SDK: ' + (err.message || 'error'))
      }
    }

    init()

    return () => {
      mounted = false
      try { if (map && typeof map.remove === 'function') map.remove() } catch {}
    }
  }, [center, zoom])

  return (
    <div>
      <div id="mapcn" ref={ref} className="map-canvas" style={{ minHeight: 420 }} />
      <p className="map-status">{status}</p>
    </div>
  )
}
