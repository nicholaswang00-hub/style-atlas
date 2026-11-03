import type { Entry, ModuleId } from '@/types'
import { MODULES } from '@/types'
import { CopyButton } from './CopyButton'
import { useLang, UI, COMPOSE_LABEL_EN } from '@/i18n'

export type ComposeState = Partial<Record<ModuleId, Entry>>

interface Props {
  compose: ComposeState
  onRemove: (module: ModuleId) => void
  onClear: () => void
}

function buildBrief(compose: ComposeState): { en: string; cn: string } {
  const lines: string[] = []
  const cnParts: string[] = []

  const v = compose.visual
  if (v) {
    lines.push(
      `VISUAL STYLE — ${v.titleEn}:\n${v.prompt ?? ''}${v.negativePrompt ? `\nNEGATIVE (avoid): ${v.negativePrompt}` : ''}`
    )
    cnParts.push(v.title)
  }
  const c = compose.camera
  if (c) {
    lines.push(`CAMERA — ${c.titleEn}:\n${c.prompt ?? ''}`)
    cnParts.push(c.title)
  }
  const n = compose.narrative
  if (n) {
    const beats = n.beats ? ` Beats: ${n.beats.join(' → ')}.` : ''
    lines.push(`STORY STRUCTURE — ${n.titleEn} (${n.title}).${beats}`)
    cnParts.push(n.title)
  }
  const m = compose.music
  if (m) {
    lines.push(`SOUNDTRACK — ${m.titleEn}:\n${m.sunoTags ?? ''}`)
    cnParts.push(m.title)
  }
  const p = compose.creator
  if (p) {
    lines.push(`PRESENTER PERSONA — ${p.titleEn} (${p.title}).`)
    cnParts.push(p.title)
  }

  return { en: lines.join('\n\n'), cn: cnParts.join(' × ') }
}

export function ComposeBar({ compose, onRemove, onClear }: Props) {
  const lang = useLang()
  const t = UI[lang]
  const filled = MODULES.filter((m) => compose[m.id])
  const open = filled.length > 0
  const { en, cn } = buildBrief(compose)

  return (
    <div className={`compose-bar${open ? ' open' : ''}`}>
      <div className="compose-inner">
        <div className="compose-slots">
          {MODULES.map((m) => {
            const e = compose[m.id]
            return (
              <span key={m.id} className={`compose-slot${e ? ' filled' : ''}`}>
                <span className="slot-label">{lang === 'en' ? COMPOSE_LABEL_EN[m.id] : m.composeLabel}</span>
                {e ? (
                  <>
                    {lang === 'en' ? e.titleEn : e.title}
                    <button className="slot-clear" type="button" onClick={() => onRemove(m.id)} aria-label={`${t.remove}${e.title}`}>
                      ×
                    </button>
                  </>
                ) : (
                  t.slotEmpty
                )}
              </span>
            )
          })}
        </div>

        <div className="compose-preview">
          {en}
          {cn && `\n\n${lang === 'zh' ? '中文速记' : 'CN summary'}：${cn}`}
        </div>

        <div className="compose-actions">
          <CopyButton text={`${en}\n\n中文速记：${cn}`} label={t.copyBrief} trackIds={Object.values(compose).filter((e): e is NonNullable<(typeof compose)[string]> => Boolean(e)).map((e) => e.id)} />
          <CopyButton text={cn} label={t.copyCn} />
          <button type="button" className="copy-btn" onClick={onClear}>
            {t.clear}
          </button>
          <span className="compose-hint">
            {lang === 'zh'
              ? `${filled.length}/5 块积木 · 从任意卡片点「＋拼搭」加入`
              : `${filled.length}/5 blocks · tap “＋ Add to brief” on any card`}
          </span>
        </div>
      </div>
    </div>
  )
}
