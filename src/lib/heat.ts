// 热度计数：上报与拉取（后端为 EdgeOne Pages Functions + KV）
const API = 'https://styleatlas-gallery.cn/api'

export type HeatAction = 'view' | 'copy' | 'share'

/** 上报一次行为，静默失败不影响页面 */
export function trackHeat(id: string, action: HeatAction) {
  try {
    void fetch(`${API}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action }),
      keepalive: true,
    })
  } catch {
    /* 静默降级 */
  }
}

export type HeatRank = Record<string, number>

/** 拉取热度榜（id -> 名次，从 1 开始），失败返回空对象 */
export async function fetchHeatRank(): Promise<HeatRank> {
  try {
    const ctrl = new AbortController()
    const timer = window.setTimeout(() => ctrl.abort(), 2500)
    const res = await fetch(`${API}/top`, { signal: ctrl.signal })
    window.clearTimeout(timer)
    if (!res.ok) return {}
    const rows = (await res.json()) as { id: string }[]
    const rank: HeatRank = {}
    rows.forEach((row, idx) => {
      rank[row.id] = idx + 1
    })
    return rank
  } catch {
    return {}
  }
}
