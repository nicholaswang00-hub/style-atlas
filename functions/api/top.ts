interface Env {
  HEAT: KVNamespace
}

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const json = (data: unknown) =>
  new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json', ...cors } })

export const onRequestOptions = async () => new Response(null, { headers: cors })

// 算分：浏览×1 + 复制×3 + 分享×2，复制是最强信号
export const onRequestGet = async ({ env }: { env: Env }) => {
  const weights: Record<string, number> = { view: 1, copy: 3, share: 2 }
  const score: Record<string, number> = {}
  const listed = await env.HEAT.list()
  for (const key of listed.keys) {
    const sep = key.name.indexOf(':')
    const action = key.name.slice(0, sep)
    const id = key.name.slice(sep + 1)
    const value = Number((await env.HEAT.get(key.name)) ?? 0)
    if (!id || Number.isNaN(value)) continue
    score[id] = (score[id] ?? 0) + value * (weights[action] ?? 0)
  }
  const top = Object.entries(score)
    .sort((x, y) => y[1] - x[1])
    .slice(0, 50)
    .map(([id, s]) => ({ id, score: s }))
  return json(top)
}
