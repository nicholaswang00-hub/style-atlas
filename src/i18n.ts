import { createContext, useContext } from 'react'
import type { ModuleId } from '@/types'

export type Lang = 'zh' | 'en'

export const LangContext = createContext<Lang>('zh')
export const useLang = () => useContext(LangContext)

/* ---------- 界面通用文案 ---------- */
export const UI: Record<Lang, Record<string, string>> = {
  zh: {
    vol: 'VOL.07 · 扩充版',
    countSuffix: '词条 / 5 模块',
    tag: '创作对齐参考库',
    navAll: '全部',
    familyCount: '条',
    badgeDemo: '示范短片',
    badgePresenter: '口播示范',
    badgeVertical: '9:16 竖屏人设',
    diagramCaption: '机位-主体示意 · 循环动画',
    audioLabel: '20″ 样例',
    blockPrompt: 'Prompt · 英文提示词',
    blockNegative: 'Negative · 负面提示词（不要出现）',
    blockSuno: 'Suno Tags · 风格标签',
    blockScript: '脚本公式 · 可直接复制',
    blockOutline: '大纲模板',
    copyKeywords: '复制关键词',
    mood: '适用情绪：',
    works: '作品举例',
    related: '相近 →',
    compose: '＋ 拼搭',
    composed: '✓ 已入拼搭',
    slotEmpty: '待选',
    copyBrief: '复制完整创作简报',
    copyCn: '复制中文速记',
    clear: '清空',
    remove: '移除',
  },
  en: {
    vol: 'VOL.07 · Expanded',
    countSuffix: 'entries · 5 modules',
    tag: 'A Creative Alignment Reference',
    navAll: 'All',
    familyCount: '',
    badgeDemo: 'Demo clip',
    badgePresenter: 'Presenter demo',
    badgeVertical: '9:16 vertical persona',
    diagramCaption: 'Camera–subject diagram · looping',
    audioLabel: '20″ sample',
    blockPrompt: 'Prompt · copy-ready',
    blockNegative: 'Negative prompt (avoid)',
    blockSuno: 'Suno-style tags',
    blockScript: 'Script formula · copy-ready',
    blockOutline: 'Outline template',
    copyKeywords: 'Copy keywords',
    mood: 'Mood: ',
    works: 'Examples',
    related: 'Similar →',
    compose: '＋ Add to brief',
    composed: '✓ In brief',
    slotEmpty: 'empty',
    copyBrief: 'Copy full brief',
    copyCn: 'Copy CN summary',
    clear: 'Clear',
    remove: 'Remove ',
  },
}

/* ---------- 家族英文名 ---------- */
export const FAMILY_EN: Record<string, string> = {
  手绘动画: 'Hand-Drawn Animation',
  绘画质感: 'Painting & Texture',
  经典设计: 'Classic Design',
  摄影与电影: 'Photography & Film',
  数字与科幻: 'Digital & Sci-Fi',
  景别: 'Shot Size',
  角度: 'Angles',
  运镜: 'Movement',
  时间与特效: 'Time & Effects',
  构图: 'Composition',
  组合运镜: 'Combo Moves',
  经典骨架: 'Classic Frameworks',
  时间结构: 'Time Structures',
  伏笔与悬念: 'Setup & Suspense',
  视角与声音: 'Perspective & Voice',
  古典与舞曲: 'Classical & Dance',
  爵士家族: 'Jazz Family',
  电子: 'Electronic',
  民族与世界: 'Folk & World',
  氛围: 'Ambient',
  人设口播: 'Personas',
  形式套路: 'Format Formulas',
}

/* ---------- 模块描述与拼搭标签 ---------- */
export const MODULE_DESC_EN: Record<ModuleId, string> = {
  visual:
    'Each style = a sample image of the same subject + copy-ready English prompt + negative prompt + keywords. Same protagonist, same composition — style differences at a glance.',
  camera:
    'Each shot/move = demo clip + camera–subject diagram animation + prompt formula + suitable moods. Feel the motion first, then read the setup; combo moves at the end are for appreciation, without diagrams.',
  narrative:
    'Each structure = a beat flow + a fill-in-the-blank outline + film/novel examples. Not a literature class — blueprint skeletons.',
  music:
    'Each genre = a playable 20-second AI sample + Suno-style tags. For aligning on the “feel”, not for final use.',
  creator:
    'Short-video creator personas and content formulas in 9:16. Each entry carries a copy-ready script formula: hook placement, cut timing, caption style.',
}

export const COMPOSE_LABEL_EN: Record<ModuleId, string> = {
  visual: 'Style',
  camera: 'Camera',
  narrative: 'Story',
  music: 'Music',
  creator: 'Persona',
}

/* ---------- 102 条词条英文短字段（第一期：点评 + 关键词） ---------- */
export const ENTRY_EN: Record<string, { tagline?: string; keywords?: string[] }> = {
  /* ===== 画面风格 ===== */
  'v-ghibli': {
    tagline: 'The synonym for hand-painted anime backgrounds: watercolor nature, gentle light, healing pastoral.',
    keywords: ['watercolor', 'hand-painted', 'natural light', 'pastoral healing'],
  },
  'v-storybook': {
    tagline: 'Children’s picture-book texture: soft pastel washes, gentle outlines, warm and innocent.',
    keywords: ['pastel', 'fine outlines', 'childlike', 'soft'],
  },
  'v-makoto': {
    tagline: 'Skies and light pushed to the extreme: god rays, lens flare, saturated blue-gold contrast.',
    keywords: ['volumetric light', 'lens flare', 'sky', 'high saturation'],
  },
  'v-toon': {
    tagline: 'Bold black outlines + flat cel colors: the playful geometry of 1950s UPA limited animation.',
    keywords: ['bold outlines', 'flat colors', 'retro cartoon', 'geometric'],
  },
  'v-inkanim': {
    tagline: 'The signature craft of Shanghai Animation: splashed-ink landscapes in motion, meaning in the empty space.',
    keywords: ['splashed ink', 'rice-paper voids', 'SAFS', 'poetic mood'],
  },
  'v-cel': {
    tagline: '1990s cel animation: hard-edged shadows, inked outlines, late-Showa nostalgia.',
    keywords: ['cel', 'hard shadows', 'film grain', 'retro anime'],
  },
  'v-crayon': {
    tagline: 'Kindergarten strokes: a wobbly crayon sun, healing for the whole world.',
    keywords: ['waxy texture', 'naive', 'doodle', 'innocence'],
  },
  'v-impress': {
    tagline: 'Monet’s broken brushstrokes: catching a moment of light as colors tremble on canvas.',
    keywords: ['broken strokes', 'dappled light', 'plein air', 'oil paint'],
  },
  'v-ukiyoe': {
    tagline: 'Hokusai’s waves and Hiroshige’s blues: woodblock layers, a world per print.',
    keywords: ['woodblock print', 'flat color blocks', 'indigo', 'Edo'],
  },
  'v-inkfree': {
    tagline: 'Idea before brush: a mountain in three strokes — spirit matters more than likeness.',
    keywords: ['xieyi', 'five ink tones', 'qi rhythm', 'blank space'],
  },
  'v-pointil': {
    tagline: 'Seurat’s scientific romance: ten thousand pure-color dots that blend in your eye.',
    keywords: ['pure dots', 'optical mixing', 'Seurat', 'shimmer'],
  },
  'v-impasto': {
    tagline: 'Van Gogh’s swirling strokes: paint piled thick, emotion growing out of texture.',
    keywords: ['impasto', 'palette knife', 'swirl strokes', 'intense'],
  },
  'v-gongbi': {
    tagline: 'The restraint of Song academy painting: fine-line drawing, mineral colors, silk texture.',
    keywords: ['fine lines', 'mineral pigments', 'silk scroll', 'Song style'],
  },
  'v-artdeco': {
    tagline: '1920s luxury geometry: symmetry, gold on dark green, radiating sunbursts.',
    keywords: ['geometric symmetry', 'gold lines', 'sunburst', 'vintage poster'],
  },
  'v-bauhaus': {
    tagline: 'Form follows function: red-yellow-blue primaries, circle-triangle-square, grid rationality.',
    keywords: ['primary colors', 'geometric grid', 'modernism', 'poster'],
  },
  'v-memphis': {
    tagline: 'The playful rebellion of the 80s: squiggles, terrazzo, pastel clashes — a postmodern party.',
    keywords: ['squiggles', 'color clash', '80s', 'postmodern'],
  },
  'v-pop': {
    tagline: 'Lichtenstein’s Ben-Day dots: comic primaries, screen print, a carnival of mass imagery.',
    keywords: ['halftone dots', 'screen print', 'comic primaries', 'pop culture'],
  },
  'v-swiss': {
    tagline: 'The grid is order: sans-serif type, mathematical white space, one red dot says it all.',
    keywords: ['grid system', 'sans-serif', 'white space', 'rationalism'],
  },
  'v-minimal': {
    tagline: 'Less is more: one tiny figure, one whole empty world.',
    keywords: ['negative space', 'two-tone', 'solitude', 'Japanese minimal'],
  },
  'v-wes': {
    tagline: 'Compulsively symmetrical framing + pastel vintage props: storybook order.',
    keywords: ['perfect symmetry', 'pastel', 'vintage props', 'fairytale'],
  },
  'v-tealorange': {
    tagline: 'The Hollywood grade: warm skin against cool teal shadows — instant cinema.',
    keywords: ['cinematic grade', 'warm-cool contrast', 'widescreen', 'rim light'],
  },
  'v-film': {
    tagline: 'Half-stop overexposed sunlight, soft pastels, 35mm grain: quiet everyday poetry.',
    keywords: ['overexposed', 'film grain', 'pastel', 'everyday'],
  },
  'v-bwdoc': {
    tagline: 'Magnum monochrome: the decisive moment, stories living in the grain.',
    keywords: ['high contrast', 'film grain', 'decisive moment', 'Magnum'],
  },
  'v-golden': {
    tagline: 'One hour before sunset: gold-rimmed silhouettes, lens flare as a free filter.',
    keywords: ['rim light', 'lens flare', 'warm amber', 'cinematic'],
  },
  'v-filmleak': {
    tagline: 'Expired-film accidents: red light leaks, ghosted double exposures — flaws as style.',
    keywords: ['light leak', 'double exposure', 'expired film', 'imperfection'],
  },
  'v-cyberpunk': {
    tagline: 'Rainy neon metropolis: magenta vs cyan, holographic signs, wet reflective streets.',
    keywords: ['neon', 'rainy night', 'magenta-cyan', 'hologram'],
  },
  'v-clay': {
    tagline: 'Aardman-style handmade warmth: fingerprints still on the clay, adorably clumsy.',
    keywords: ['handmade', 'clay texture', 'stop motion', 'miniature set'],
  },
  'v-isometric': {
    tagline: 'A miniature world from a 45° god view: clean gradients, vector-level precision.',
    keywords: ['isometric 45°', 'miniature', 'clean gradient', '3D illustration'],
  },
  'v-pixel': {
    tagline: 'A world built block by block: 16-bit romance, the grainier the deeper.',
    keywords: ['16-bit', 'retro game', 'dithering', 'dot matrix'],
  },
  'v-lowpoly': {
    tagline: 'Landscapes built from triangles: angular tenderness, the indie-game aesthetic.',
    keywords: ['triangles', 'flat shading', 'pastel', 'indie game'],
  },
  'v-glitch': {
    tagline: 'The broken frame is the beauty: RGB splits, pixel sorting, data collapse.',
    keywords: ['RGB split', 'pixel sorting', 'data corruption', 'cyber glitch'],
  },
}

Object.assign(ENTRY_EN, {
  /* ===== 镜头语言 ===== */
  'c-establishing': {
    tagline: 'A figure small as a bean: sets the world and scale — loneliness and epicness both live here.',
    keywords: ['epic', 'world-setting', 'tiny figure'],
  },
  'c-closeup': {
    tagline: 'Right in the face: emotion lives in the eyes, background melts into color blocks.',
    keywords: ['in-your-face', 'shallow DOF', 'amplified emotion'],
  },
  'c-lowangle': {
    tagline: 'Camera below eye level looking up: the subject looms tall, powerful — or threatening.',
    keywords: ['looking up', 'towering', 'power'],
  },
  'c-dutch': {
    tagline: 'Tilt the frame 15–45°: the world loses balance, and the viewer’s heart tilts with it.',
    keywords: ['tilted frame', 'off-balance', 'unease'],
  },
  'c-orbit': {
    tagline: 'The camera circles the subject, who stays centered while the background flows.',
    keywords: ['orbit', '360°', 'centered subject'],
  },
  'c-handheld': {
    tagline: 'Walk with the subject: breathing shake turns the viewer into a companion.',
    keywords: ['tracking', 'breathing shake', 'documentary'],
  },
  'c-dollyzoom': {
    tagline: 'The Vertigo classic: dolly and zoom in opposite directions — subject frozen, background warps.',
    keywords: ['Hitchcock', 'vertigo', 'warped background'],
  },
  'c-slowmo': {
    tagline: 'Time syrup at 120fps: stretches one second of action into ten seconds of emotion.',
    keywords: ['high frame rate', 'time stretch', 'detail'],
  },
  'c-bullettime': {
    tagline: 'The Matrix: time freezes while the camera alone orbits through the air.',
    keywords: ['frozen time', 'orbit effect', 'The Matrix'],
  },
  'c-timelapse': {
    tagline: 'Clouds sprint, light sweeps the land: an hour compressed into five seconds.',
    keywords: ['time compression', 'cloud flow', 'sweeping light'],
  },
  'c-symmetry': {
    tagline: 'Split down the central axis: order, ritual — or unsettling perfection.',
    keywords: ['central axis', 'mirror', 'one-point perspective'],
  },
  'c-frame': {
    tagline: 'Doors, windows, arches as natural frames: the eye is guided, the story gains depth.',
    keywords: ['frame in frame', 'foreground frame', 'layering'],
  },
  'c-combo-rise': {
    tagline: 'Low angle + vertical rise: from the feet up to mid-air, the giant becomes a dot in the landscape.',
    keywords: ['low angle', 'vertical rise', 'reveal'],
  },
  'c-combo-orbit': {
    tagline: 'Orbit + crane up + tilt down: spin and rise at once, pulling person and valley into one frame.',
    keywords: ['orbit', 'ascend', 'top-down finish'],
  },
  'c-combo-arc': {
    tagline: 'Follow behind, then arc to the front: one shot completes the “companion → conversationalist” shift.',
    keywords: ['follow', 'arc to front', 'POV shift'],
  },
  /* ===== 叙事结构 ===== */
  'n-hero': { tagline: 'Campbell’s mythic skeleton: an ordinary soul called, tested, and returning with the treasure.' },
  'n-threeact': { tagline: 'Setup–confrontation–resolution: Hollywood’s unshaken century-old foundation.' },
  'n-savecat': { tagline: '15 beats down to the page number: assembly-line precision for screenwriting.' },
  'n-pixar': { tagline: 'Six blanks tell a whole story: Once upon a time… Every day… Until…' },
  'n-loop': { tagline: 'The hero is trapped in the same day, finding the break-out variable through endless retries.' },
  'n-flashback': { tagline: 'Start at the ending or climax, then rewind to “how did we get here”.' },
  'n-countdown': { tagline: 'Strap a ticking bomb to the story: everything must happen before the deadline.' },
  'n-chronicle': { tagline: 'Drift down the river of time: a chapter a year, watching people changed by the years.' },
  'n-chekhov': { tagline: 'A gun on the wall in Act One must fire in Act Three — every detail echoes.' },
  'n-info-gap': { tagline: 'The audience knows the bomb under the table; the characters don’t — suspense is asymmetry.' },
  'n-macguffin': { tagline: 'Everyone chases a thing — and what the thing is doesn’t matter at all.' },
  'n-twist': { tagline: 'The last five minutes overturn everything: looking back, every frame was a clue.' },
  'n-kishotenketsu': { tagline: 'The East-Asian four-part form: no conflict needed — after the twist, everything is re-read.' },
  'n-freytag': { tagline: 'A climbing chart of dramatic tension: rise, peak, fall — the five-act arc for tragedy.' },
  'n-storycircle': { tagline: 'Eight steps in a ring: leave the comfort zone, return home changed.' },
  'n-parallel': { tagline: 'Storylines advance in turns and detonate each other where they meet.' },
  'n-reverse': { tagline: 'Told backwards from the end: suspense shifts from “what happens” to “why did it happen”.' },
  'n-frame': { tagline: 'A story within a story: the outer teller frames the inner legend — the telling itself is theatre.' },
  'n-redherring': { tagline: 'Deliberate false leads: let the audience guess wrong with total confidence.' },
  'n-bomb': { tagline: 'Hitchcock’s rule: when the audience knows the bomb under the table, small talk becomes agony.' },
  'n-narratortrick': { tagline: 'The narration never lies — it just doesn’t tell all: the viewpoint itself is the trick.' },
  'n-unreliable': { tagline: 'The storyteller is lying, forgetting, or mad — truth must be pried from the cracks.' },
  'n-rashomon': { tagline: 'One event, four tellings — everyone casts themselves as the good guy.' },
  'n-fourthwall': { tagline: 'The character suddenly looks into the lens: you’re not a bystander, you’re an accomplice.' },
})

Object.assign(ENTRY_EN, {
  /* ===== 音乐风格 ===== */
  'm-waltz': {
    tagline: 'A strict 3/4 spinning dance: strings go “boom-cha-cha”, Vienna-hall elegance.',
    keywords: ['triple meter', 'strings', 'ballroom', 'spinning'],
  },
  'm-neoclassical': {
    tagline: 'A whisper of felt piano: more silence than notes, emotion rising in the quiet.',
    keywords: ['felt piano', 'negative space', 'string swell', 'restrained'],
  },
  'm-swing': {
    tagline: '1930s big band: walking bass + brass hits — your feet can’t sit still.',
    keywords: ['big band', 'walking bass', 'brass', 'danceable'],
  },
  'm-bossa': {
    tagline: 'Dusk on a Rio beach: nylon-guitar syncopation, soft as a sea breeze.',
    keywords: ['nylon guitar', 'syncopation', 'Brazil', 'laid-back'],
  },
  'm-jazzfunk': {
    tagline: '70s fusion: slap bass + wah guitar + Rhodes — a groove party.',
    keywords: ['groove', 'slap bass', 'fusion', 'retro'],
  },
  'm-synthwave': {
    tagline: 'An 80s neon night drive: analog synth arpeggios + gated-reverb snare.',
    keywords: ['analog synth', 'neon', 'night drive', 'retro-future'],
  },
  'm-vaporwave': {
    tagline: 'Slowed-down 80s mall muzak: warbling tape, empty shopping centers, nostalgic haze.',
    keywords: ['slowed samples', 'retro-future', 'lo-fi', 'dreamy'],
  },
  'm-deephouse': {
    tagline: 'A 122 BPM late-night hypnosis: four-on-the-floor + warm bassline, poolside groove.',
    keywords: ['4/4 kick', 'bassline', 'late night', 'groove'],
  },
  'm-lofi': {
    tagline: 'Vinyl crackle + lazy jazz-piano loops: the king of study-session BGM.',
    keywords: ['vinyl noise', 'jazz piano', 'lazy', 'companion'],
  },
  'm-guochao': {
    tagline: 'Guzheng and dizi samples meet 808 bass: modern hip-hop on Chang’an Avenue.',
    keywords: ['guzheng sample', '808', 'folk fusion', 'street'],
  },
  'm-celtic': {
    tagline: 'Tin whistle and fiddle jigs: bonfire energy in an Irish pub.',
    keywords: ['tin whistle', 'fiddle', 'jig', 'tavern'],
  },
  'm-darkambient': {
    tagline: 'Sub-bass rumbles and metallic echoes: no melody, only approaching unease.',
    keywords: ['low frequency', 'drone', 'oppressive', 'suspense'],
  },
  'm-baroque': {
    tagline: 'A crisp harpsichord chase: ornaments like dewdrops, not one blurred.',
    keywords: ['harpsichord', 'ornaments', 'dance rhythm', 'courtly'],
  },
  'm-tango': {
    tagline: 'The push and pull of the bandoneón: come-hither and go-yonder, menace in every step.',
    keywords: ['bandoneón', 'dramatic', 'push-pull', 'Buenos Aires'],
  },
  'm-cooljazz': {
    tagline: 'Bebop served chilled: muted trumpet, relaxed and refined.',
    keywords: ['muted trumpet', 'brush drums', 'relaxed', 'West Coast'],
  },
  'm-dnb': {
    tagline: 'A 174 BPM breakbeat machine gun: bass rolling underfoot, hi-hats flying overhead.',
    keywords: ['breakbeat', 'rolling bass', 'liquid funk', 'high speed'],
  },
  'm-wafu': {
    tagline: 'One shakuhachi breath blows out a forest: more silence than sound, zen in the sparse.',
    keywords: ['shakuhachi', 'shamisen', 'pentatonic', 'blank space'],
  },
  'm-afrobeat': {
    tagline: 'Interlocking layers of percussion: when the brass shouts, the whole room dances.',
    keywords: ['polyrhythm', 'brass', 'groove', 'African percussion'],
  },
  'm-flamenco': {
    tagline: 'Rasgueado guitar like sudden rain, handclaps flickering bright and dark: Andalusian pride.',
    keywords: ['rasgueado', 'palmas', 'Phrygian mode', 'pride'],
  },
  'm-dreamambient': {
    tagline: 'Glowing pads drift slowly: like lying on a cloud hearing a distant choir.',
    keywords: ['pads', 'long reverb', 'floating', 'healing'],
  },
  'm-forest': {
    tagline: 'Birdsong, leaves and a stream as the band: an acoustic guitar gently sings along.',
    keywords: ['birdsong', 'nature sounds', 'acoustic guitar', 'morning'],
  },
  /* ===== 博主风格 ===== */
  'p-xiaozhang': {
    tagline: 'This site’s curator in person: an educator-lamplighter vibe — suit, glasses, gentle yet certain.',
    keywords: ['authority', 'case teaching', 'three-part structure', 'quotable close'],
  },
  'p-consultant': {
    tagline: 'The management consultant: one concept, one case breakdown, three takeaways.',
    keywords: ['concept→case→advice', 'text cards', '5-8s cuts'],
  },
  'p-coach': {
    tagline: 'No answers, only questions: three probing questions in a row to expose the viewer’s blind spot.',
    keywords: ['probing questions', 'revelation', 'homework', 'close-up'],
  },
  'p-finance': {
    tagline: 'Hot events + data charts + sharp opinions: be the audience’s “translator”.',
    keywords: ['news→data→opinion', 'charts', 'strong stance'],
  },
  'p-mentor': {
    tagline: 'First my own pitfall, then the method, then an embrace of the viewer’s feelings.',
    keywords: ['pitfall→method→empathy', 'warm light', 'radio vibe'],
  },
  'p-quotes': {
    tagline: 'No face needed: big-type aphorisms pop line by line to a drum-beat rhythm.',
    keywords: ['big text cards', 'drum beat', '2s per line', 'face at the end'],
  },
  'p-skit': {
    tagline: 'One person, two roles: management conflict as a 30-second office mini-drama.',
    keywords: ['dual roles', 'jump cuts', 'twist ending'],
  },
  'p-listicle': {
    tagline: '“3 methods” counted straight off: maximum information density, the save-rate king.',
    keywords: ['numbered list', 'high density', 'save-worthy'],
  },
  'p-whiteboard': {
    tagline: 'One whiteboard, one marker: draw while you talk, turning complex models into kid-simple diagrams.',
    keywords: ['draw-and-talk', 'framework diagrams', 'handwritten hook'],
  },
  'p-street': {
    tagline: 'Hand the mic to strangers: genuine reactions are the strongest content.',
    keywords: ['real reactions', 'montage', 'comment bait'],
  },
  'p-debate': {
    tagline: 'Fight yourself: 20 seconds per side — the friction is the watch-through rate.',
    keywords: ['pro vs con', 'split screen', 'pick-a-side'],
  },
})
