export type ModuleId = 'visual' | 'camera' | 'narrative' | 'music' | 'creator'

export type DiagramKind =
  | 'orbit'
  | 'lowangle'
  | 'dollyzoom'
  | 'establishing'
  | 'closeup'
  | 'dutch'
  | 'handheld'
  | 'slowmo'
  | 'bullettime'
  | 'timelapse'
  | 'symmetry'
  | 'frame'

export interface WorkExample {
  title: string
  note: string
}

export interface Entry {
  id: string
  module: ModuleId
  family: string
  title: string
  titleEn: string
  /** 一句话百科定位 */
  tagline: string
  /** 示例图（public/assets 下路径） */
  image?: string
  /** 镜头：示范短片 */
  video?: string
  /** 音乐样例音频 */
  audio?: string
  /** 可直接喂给 AI 的英文提示词 */
  prompt?: string
  /** 负面提示词：生成时不要出现的特征 */
  negativePrompt?: string
  /** 中文关键词 */
  keywords?: string[]
  /** Suno 类工具风格标签 */
  sunoTags?: string
  /** 镜头：机位示意动画类型 */
  diagram?: DiagramKind
  /** 镜头：适用情绪 */
  mood?: string
  /** 叙事：节拍流程 */
  beats?: string[]
  /** 叙事：关键节拍（高亮）索引 */
  keyBeats?: number[]
  /** 叙事：一句话大纲模板 */
  outline?: string
  /** 叙事：作品举例 */
  works?: WorkExample[]
  /** 博主：脚本公式 */
  script?: string
  /** 相近词条 id */
  related: string[]
}

export interface ModuleInfo {
  id: ModuleId
  index: string
  title: string
  titleEn: string
  desc: string
  composeLabel: string
}

export const MODULES: ModuleInfo[] = [
  {
    id: 'visual',
    index: '01',
    title: '画面风格',
    titleEn: 'Visual Styles',
    desc: '每种风格 = 同一主体示例图 + 可直接复制的英文提示词 + 负面提示词 + 中文关键词。同一主角同一构图，风格差异一目了然。',
    composeLabel: '风格',
  },
  {
    id: 'camera',
    index: '02',
    title: '镜头语言',
    titleEn: 'Camera Language',
    desc: '每种机位/运镜 = 示范短片 + 机位-主体示意动画 + prompt 写法 + 适用情绪。先看片感受运动，再看图理解机位；末尾「组合运镜」为复杂画面欣赏，不配图解。',
    composeLabel: '镜头',
  },
  {
    id: 'narrative',
    index: '03',
    title: '叙事结构',
    titleEn: 'Narrative Structures',
    desc: '每种结构 = 节拍流程图 + 一句话大纲模板 + 小说/电影作品举例。不是文学课，是骨架图纸。',
    composeLabel: '叙事',
  },
  {
    id: 'music',
    index: '04',
    title: '音乐风格',
    titleEn: 'Music Styles',
    desc: '每种曲风 = 20 秒可播放 AI 样例 + Suno 类工具风格标签。用于对齐「感觉」，不作成品使用。',
    composeLabel: '音乐',
  },
  {
    id: 'creator',
    index: '05',
    title: '博主风格',
    titleEn: 'Creator Personas',
    desc: '短视频博主的人设与内容公式，9:16 竖屏呈现。每条带可直接复制的中文脚本公式：钩子怎么埋、几秒切屏、字幕怎么打。',
    composeLabel: '人设',
  },
]

export const FAMILY_ORDER: Record<ModuleId, string[]> = {
  visual: ['手绘动画', '绘画质感', '经典设计', '摄影与电影', '数字与科幻'],
  camera: ['景别', '角度', '运镜', '时间与特效', '构图', '组合运镜'],
  narrative: ['经典骨架', '时间结构', '伏笔与悬念', '视角与声音'],
  music: ['古典与舞曲', '爵士家族', '电子', '民族与世界', '氛围'],
  creator: ['人设口播', '形式套路'],
}
