// 临时调试版 v3：逐步定位
interface KVNS {
  get(key: string): Promise<string | null>
  put(key: string, value: string): Promise<void>
  list(opts?: { prefix?: string }): Promise<unknown>
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

export const onRequestGet = async () => {
  let step = 'list'
  try {
    const listed = (await HEAT.list({ prefix: '' })) as { keys?: { name: string }[] }
    step = 'parse'
    const names = (listed?.keys ?? []).map((k) => k.name)
    let sample: string | null = null
    if (names.length) {
      step = 'get:' + names[0]
      sample = await HEAT.get(names[0])
    }
    return json({ debug: 'v3', names, sample, raw: listed })
  } catch (e) {
    return json({ debug: 'v3', step, error: String(e) })
  }
}
