import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/i18n'

interface Props {
  text: string
  label?: string
  light?: boolean
}

export function CopyButton({ text, label, light = false }: Props) {
  const lang = useLang()
  const shown = label ?? (lang === 'en' ? 'Copy' : '复制')
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      className={`copy-btn${light ? ' light' : ''}${copied ? ' copied' : ''}`}
      onClick={onCopy}
      type="button"
    >
      {copied ? (lang === 'en' ? 'Copied ✓' : '已复制 ✓') : shown}
    </button>
  )
}
