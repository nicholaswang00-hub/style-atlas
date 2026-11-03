import { useEffect, useMemo, useState } from 'react'
import type { Entry, ModuleId } from '@/types'
import { ENTRIES } from '@/data/entries'
import { FAMILY_ORDER, MODULES } from '@/types'
import { EntryCard } from '@/components/EntryCard'
import { ComposeBar, type ComposeState } from '@/components/ComposeBar'
import { LangContext, UI, FAMILY_EN, MODULE_DESC_EN, type Lang } from '@/i18n'

/** 滚动入场动效 */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (items) => {
        for (const item of items) {
          if (item.isIntersecting) {
            item.target.classList.add('revealed')
            io.unobserve(item.target)
          }
        }
      },
      { threshold: 0.08 },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}

function App() {
  const [activeModule, setActiveModule] = useState<ModuleId | 'all'>('all')
  const [compose, setCompose] = useState<ComposeState>({})
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('atlas-lang') as Lang) || 'zh')
  useReveal()

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'zh' ? 'en' : 'zh'
      localStorage.setItem('atlas-lang', next)
      return next
    })
  }
  const t = UI[lang]

  const visibleModules = useMemo(
    () => (activeModule === 'all' ? MODULES : MODULES.filter((m) => m.id === activeModule)),
    [activeModule],
  )

  const onCompose = (entry: Entry) => {
    setCompose((prev) => {
      const next = { ...prev }
      if (next[entry.module]?.id === entry.id) {
        delete next[entry.module]
      } else {
        next[entry.module] = entry
      }
      return next
    })
  }

  const onJump = (id: string) => {
    const target = ENTRIES.find((e) => e.id === id)
    if (!target) return
    if (activeModule !== 'all' && activeModule !== target.module) setActiveModule('all')
    requestAnimationFrame(() => {
      document.getElementById(`entry-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }

  return (
    <LangContext.Provider value={lang}>
      <header className="masthead">
        <div className="masthead-title">
          风格图谱 <em>Style Atlas</em>
        </div>
        <div className="masthead-meta">
          <span>{t.vol}</span>
          <span>
            {ENTRIES.length} {t.countSuffix}
          </span>
          <span>{t.tag}</span>
          <button type="button" className="lang-toggle" onClick={toggleLang}>
            {lang === 'zh' ? 'EN' : '中文'}
          </button>
        </div>
      </header>

      <nav className="module-nav">
        <button className={activeModule === 'all' ? 'active' : ''} onClick={() => setActiveModule('all')} type="button">
          <span className="num">∗</span>
          {t.navAll}
        </button>
        {MODULES.map((m) => (
          <button
            key={m.id}
            className={activeModule === m.id ? 'active' : ''}
            onClick={() => setActiveModule(m.id)}
            type="button"
          >
            <span className="num">{m.index}</span>
            {lang === 'en' ? m.titleEn : m.title}
          </button>
        ))}
      </nav>

      <main className="page">
        <section className="intro">
          {lang === 'zh' ? (
            <>
              <p className="intro-lede">
                这不是一本艺术百科，而是一面<strong>色卡墙</strong>：每条词条都自带可直接喂给 AI
                的提示词、脚本公式或风格标签——<strong>看到喜欢的，复制即走</strong>。
              </p>
              <div className="intro-note">
                <p>画面看图 · 镜头看动画 · 叙事看节拍 · 音乐听样 · 人设抄公式。</p>
                <p>点任意卡片「＋拼搭」，底部拼搭栏会把五个模块的选择自动拼成一份完整创作简报。</p>
              </div>
            </>
          ) : (
            <>
              <p className="intro-lede">
                Not an art encyclopedia but a <strong>wall of swatches</strong>: every entry carries a
                copy-ready prompt, script formula, or style tag for AI tools —{' '}
                <strong>see it, copy it, use it</strong>.
              </p>
              <div className="intro-note">
                <p>Visuals by image · camera by animation · story by beats · music by sample · personas by formula.</p>
                <p>Tap “＋ Add to brief” on any card and the bottom bar assembles your five picks into a complete creative brief.</p>
              </div>
            </>
          )}
        </section>

        {visibleModules.map((mod) => {
          const entries = ENTRIES.filter((e) => e.module === mod.id)
          const families = FAMILY_ORDER[mod.id]
            .map((fam) => ({ fam, list: entries.filter((e) => e.family === fam) }))
            .filter((g) => g.list.length > 0)

          return (
            <section className="module-section" key={mod.id}>
              <div className="module-head">
                <span className="module-index">{mod.index}</span>
                <h2 className="module-title">{lang === 'en' ? mod.titleEn : mod.title}</h2>
                <span className="module-sub">{lang === 'en' ? mod.title : mod.titleEn}</span>
                <span className="module-ghost">{mod.index}</span>
              </div>
              <p className="module-desc">{lang === 'en' ? MODULE_DESC_EN[mod.id] : mod.desc}</p>

              {families.map((g) => (
                <div className="family-group reveal" key={g.fam}>
                  <div className="family-label">
                    {lang === 'en' ? (FAMILY_EN[g.fam] ?? g.fam) : g.fam}{' '}
                    <span className="count">
                      {g.list.length} {t.familyCount}
                    </span>
                  </div>
                  <div className={`card-grid${mod.id === 'creator' ? ' vertical' : ''}${mod.id === 'visual' ? ' wide' : ''}`}>
                    {g.list.map((e) => (
                      <EntryCard
                        key={e.id}
                        entry={e}
                        inCompose={compose[e.module]?.id === e.id}
                        onCompose={onCompose}
                        onJump={onJump}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )
        })}

        <section className="howto">
          <h2 className="howto-title">{lang === 'zh' ? '怎么用这本图谱' : 'How to use this atlas'}</h2>
          <div className="howto-formula">
            {MODULES.map((m, i) => (
              <span key={m.id} style={{ display: 'contents' }}>
                <span className="pill">{lang === 'en' ? m.titleEn : m.title}</span>
                <span className="eq">{i < MODULES.length - 1 ? '+' : '='}</span>
              </span>
            ))}
            <span className="pill" style={{ background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' }}>
              {lang === 'zh' ? '一份完整创作简报' : 'One complete creative brief'}
            </span>
          </div>
          <p>
            {lang === 'zh'
              ? '每个模块挑一条点「＋拼搭」，底部拼搭栏自动拼成英文 prompt 组合与中文速记，一键复制后即可喂给图片、视频或音乐 AI——你只需描述「我要什么感觉」，不用再临时学艺术史。'
              : 'Pick one entry per module and tap “＋ Add to brief” — the bottom bar assembles an English prompt stack plus a Chinese summary, ready to paste into image, video, or music AI. Just describe the feel you want; no crash course in art history needed.'}
          </p>
        </section>

        <section className="brand-band reveal">
          <div className="brand-photos">
            <img className="bp-wide" src="/assets/brand-talk.jpg" alt="校长讲课现场" loading="lazy" />
            <img className="bp-tall" src="/assets/brand-portrait.jpg" alt="校长棚拍肖像" loading="lazy" />
            <img className="bp-wide" src="/assets/brand-gala.jpg" alt="校长宴会正装肖像" loading="lazy" />
          </div>
          <div className="brand-text">
            <span className="brand-kicker">出品 · PRESENTED BY</span>
            <h2 className="brand-name">{lang === 'zh' ? '校长' : 'The Principal'}</h2>
            <p>
              {lang === 'zh'
                ? '这本图谱由「校长」主理：把创作与教学中反复验证过的风格语言，整理成一面可以随手取用的色卡墙。图谱持续扩充，与 AI 工具一同进化。'
                : 'Curated by “The Principal”: style languages proven again and again in real creation and teaching, organized into a wall of swatches you can grab at will. The atlas keeps expanding, evolving alongside AI tools.'}
            </p>
          </div>
        </section>

        <footer className="colophon">
          <div className="feedback">
            <div className="feedback-text">
              <strong>{t.feedbackTitle}</strong>
              <span>{t.feedbackDesc}</span>
            </div>
            <div className="feedback-links">
              <a href="https://wj.qq.com/s2/28287493/pv0t/" target="_blank" rel="noreferrer">{t.feedbackSurvey}</a>
              <a href="https://github.com/nicholaswang00-hub/style-atlas/issues" target="_blank" rel="noreferrer">{t.feedbackIssue}</a>
            </div>
          </div>
          <span className="seal">风格图谱</span>
          <span>STYLE ATLAS · 风格图谱</span>
          <span>VOL.07 · {ENTRIES.length} ENTRIES</span>
          <span>{lang === 'zh' ? '示例素材为 AI 生成的风格示意' : 'All samples are AI-generated style references'}</span>
          <a className="icp" href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">{t.icpLicense}</a>
        </footer>
      </main>

      <ComposeBar
        compose={compose}
        onRemove={(m) => setCompose((prev) => {
          const next = { ...prev }
          delete next[m]
          return next
        })}
        onClear={() => setCompose({})}
      />
    </LangContext.Provider>
  )
}

export default App
