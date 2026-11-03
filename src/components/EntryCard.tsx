import { useEffect, useRef, useState } from 'react'
import type { Entry, ModuleId } from '@/types'
import { MODULES } from '@/types'
import { entryById } from '@/data/entries'
import { CopyButton } from './CopyButton'
import { CameraDiagram } from './CameraDiagram'
import { useLang, UI, FAMILY_EN, ENTRY_EN } from '@/i18n'
import { trackHeat } from '@/lib/heat'

interface Props {
  entry: Entry
  inCompose: boolean
  onCompose: (entry: Entry) => void
  onJump: (id: string) => void
}

const MODULE_LABEL: Record<ModuleId, string> = {
  visual: '画面风格',
  camera: '镜头语言',
  narrative: '叙事结构',
  music: '音乐风格',
  creator: '博主风格',
}

function BeatFlow({ beats, keyBeats }: { beats: string[]; keyBeats?: number[] }) {
  return (
    <div className="beat-flow">
      {beats.map((b, i) => (
        <span className="beat-step" key={b}>
          {i > 0 && <span className="beat-arrow">→</span>}
          <span className={`beat-node${keyBeats?.includes(i) ? ' key' : ''}`}>{b}</span>
        </span>
      ))}
    </div>
  )
}

export function EntryCard({ entry, inCompose, onCompose, onJump, heatRank }: Props) {
  const lang = useLang()
  const t = UI[lang]
  const en = ENTRY_EN[entry.id]
  const mod = MODULES.find((m) => m.id === entry.module)
  const related = entry.related.map(entryById).filter(Boolean) as Entry[]
  const title = lang === 'en' && entry.titleEn ? entry.titleEn : entry.title
  const tagline = lang === 'en' && en?.tagline ? en.tagline : entry.tagline
  const keywords = lang === 'en' && en?.keywords ? en.keywords : entry.keywords

  const cardRef = useRef<HTMLElement>(null)
  const [shared, setShared] = useState(false)
  const [flash, setFlash] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  // 深链接定位：URL 带 ?entry=词条ID 时滚动到本卡片并高亮
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('entry') !== entry.id) return
    const el = cardRef.current
    if (!el) return
    window.setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300)
    setFlash(true)
        trackHeat(entry.id, 'view')
    const t = window.setTimeout(() => setFlash(false), 3200)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}?entry=${entry.id}`
    const text = url
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
    setShared(true)
      trackHeat(entry.id, 'share')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setShared(false), 1600)
  }

  return (
    <article className={`entry-card${flash ? ' flash' : ''}`} id={`entry-${entry.id}`} ref={cardRef}>
      <div className="card-meta">
        <span>
          {mod?.index} · {(lang === 'en' ? mod?.titleEn : MODULE_LABEL[entry.module])} / {lang === 'en' ? (FAMILY_EN[entry.family] ?? entry.family) : entry.family}
        </span>
        {heatRank != null && heatRank <= 3 && (
          <span className="heat-badge">🔥 TOP{heatRank}</span>
        )}
        <span>{entry.id.toUpperCase()}</span>
      </div>

      {entry.video && (
        <div className={`card-media ${entry.module === 'creator' ? 'vertical' : 'landscape'}`}>
          <video src={entry.video} autoPlay muted loop playsInline preload="metadata" />
          <span className="badge">{entry.module === 'creator' ? t.badgePresenter : t.badgeDemo}</span>
        </div>
      )}

      {entry.image && (
        <div className={`card-media ${entry.module === 'creator' ? 'vertical' : 'landscape'}`}>
          <img src={entry.image} alt={`${entry.title}示例`} loading="lazy" />
          {entry.module === 'creator' && <span className="badge">{t.badgeVertical}</span>}
        </div>
      )}

      {entry.diagram && (
        <div className="card-media diagram-holder">
          <CameraDiagram kind={entry.diagram} />
          <div className="diagram-caption">{t.diagramCaption}</div>
        </div>
      )}

      <div className="card-body">
        <div className="card-title-row">
          <h3 className="card-title">{title}</h3>
          <span className="card-title-en">{lang === 'en' ? entry.title : entry.titleEn}</span>
        </div>

        <p className="card-tagline">{tagline}</p>

        {entry.audio && (
          <div>
            <div className="audio-row">
              <span className="audio-label">{t.audioLabel}</span>
              <audio controls preload="none" src={entry.audio} />
            </div>
          </div>
        )}

        {entry.beats && <BeatFlow beats={entry.beats} keyBeats={entry.keyBeats} />}

        {entry.prompt && (
          <div className="prompt-block">
            <div className="block-label">
              <span>{t.blockPrompt}</span>
              <CopyButton text={entry.prompt} />
            </div>
            {entry.prompt}
          </div>
        )}

        {entry.negativePrompt && (
          <div className="prompt-block negative">
            <div className="block-label">
              <span>{t.blockNegative}</span>
              <CopyButton text={entry.negativePrompt} />
            </div>
            {entry.negativePrompt}
          </div>
        )}

        {entry.sunoTags && (
          <div className="prompt-block">
            <div className="block-label">
              <span>{t.blockSuno}</span>
              <CopyButton text={entry.sunoTags} />
            </div>
            {entry.sunoTags}
          </div>
        )}

        {entry.script && (
          <div className="prompt-block">
            <div className="block-label">
              <span>{t.blockScript}</span>
              <CopyButton text={entry.script} />
            </div>
            {entry.script}
          </div>
        )}

        {entry.outline && (
          <div className="prompt-block">
            <div className="block-label">
              <span>{t.blockOutline}</span>
              <CopyButton text={entry.outline} />
            </div>
            {entry.outline}
          </div>
        )}

        {entry.mood && (
          <div className="keyword-row">
            <span className="keyword-chip">{t.mood}{entry.mood}</span>
          </div>
        )}

        {keywords && keywords.length > 0 && (
          <div className="keyword-row">
            {keywords.map((k) => (
              <span className="keyword-chip" key={k}>
                {k}
              </span>
            ))}
            <CopyButton light text={keywords.join(', ')} label={t.copyKeywords} />
          </div>
        )}

        {entry.works && (
          <div className="works-list">
            <span className="works-label">{t.works}</span>
            {entry.works.map((w) => (
              <div className="work-item" key={w.title}>
                <span className="work-title">{w.title}</span>
                <span className="work-note"> —— {w.note}</span>
              </div>
            ))}
          </div>
        )}

        <div className="related-row">
          <span>{t.related}</span>
          {related.map((r) => (
            <a key={r.id} onClick={() => onJump(r.id)}>
              {lang === 'en' && r.titleEn ? r.titleEn : r.title}
            </a>
          ))}
        </div>

        <div className="card-actions">
          <button
            type="button"
            className={`compose-btn${inCompose ? ' in-compose' : ''}`}
            onClick={() => onCompose(entry)}
          >
            {inCompose ? t.composed : t.compose}
          </button>
          <button
            type="button"
            className={`share-btn${shared ? ' shared' : ''}`}
            onClick={onShare}
          >
            {shared ? t.shareCopied : t.share}
          </button>
        </div>
      </div>
    </article>
  )
}
