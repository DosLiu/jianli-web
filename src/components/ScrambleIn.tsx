import { useEffect, useState } from 'react'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><'

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
}

export function ScrambleIn({ text, delay, triggered, className = '' }: { text: string; delay: number; triggered: boolean; className?: string }) {
  const [display, setDisplay] = useState('\u00a0')

  useEffect(() => {
    if (!triggered) {
      setDisplay('\u00a0')
      return
    }
    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      let revealed = 0
      interval = window.setInterval(() => {
        revealed += 0.5
        const cursor = Math.floor(revealed)
        const next = text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < cursor) return char
            if (index < cursor + 3) return randomChar()
            return ''
          })
          .join('')
        setDisplay(next)
        if (cursor >= text.length) {
          if (interval) window.clearInterval(interval)
          setDisplay(text)
        }
      }, 25)
    }, delay)
    return () => {
      window.clearTimeout(timeout)
      if (interval) window.clearInterval(interval)
    }
  }, [delay, text, triggered])

  return <span className={className}>{display}</span>
}
