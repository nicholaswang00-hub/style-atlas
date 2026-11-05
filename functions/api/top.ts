// EdgeOne Makers KV：命名空间绑定后作为【全局变量】注入（变量名 HEAT），不是 env 属性
// EdgeOne KV 的 key 仅支持数字/字母/下划线，故键格式为 `${action}_${enc(id)}`，
// 词条 id 内的连字符转下划线（项目内 id 均不含下划线，编码可逆）
// 注意：EdgeOne KV list() 必须传 options 对象，且返回的 keys 元素是字符串而非 {name}
interface KVNS {
  get(key: string): Promise<string | null>
  put(key: string, value: string): Promise<void>
  list(opts?: { prefix?: string }): Promise<{ keys?: unknown[] }>
}
declare const HEAT: KVNS

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const json = (data: unknown) =>
  new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json', ...cors } })

export const onRequestOptions = async () => new Response(null, { headers: cors })

// 算分：浏览×1 + 复制×3 + 分享×2，复制是最强信号
export const onRequestGet = async () => {
  try {
    const weights: Record<string, number> = { view: 1, copy: 3, share: 2 }
    const score: Record<string, number> = {}
    const listed = await HEAT.list({ prefix: '' })
    for (const k of listed.keys ?? []) {
      const name = typeof k === 'string' ? k : ((k as { name?: string }).name ?? '')
      const sep = name.indexOf('_')
      if (sep < 0) continue
      const action = name.slice(0, sep)
      const id = name.slice(sep + 1).replace(/_/g, '-')
      const value = Number((await HEAT.get(name)) ?? 0)
      if (!id || Number.isNaN(value)) continue
      score[id] = (score[id] ?? 0) + value * (weights[action] ?? 0)
    }
    const top = Object.entries(score)
      .sort((x, y) => y[1] - x[1])
      .slice(0, 50)
      .map(([id, s]) => ({ id, score: s }))
    return json(top)
  } catch {
    return json([])
  }
}
