// 临时调试版：返回 list() 原始结构，验证后恢复
interface KVNS {
  get(key: string): Promise<string | null>
  put(key: string, value: string): Promise<void>
  list(): Promise<unknown>
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
  try {
    const listed = (await HEAT.list()) as { keys?: { name: string }[] }
    const names = (listed?.keys ?? []).map((k) => k.name)
    const sample = names.length ? await HEAT.get(names[0]) : null
    return json({ debug: true, rawType: typeof listed, names, sample, raw: listed })
  } catch (e) {
    return json({ debug: true, error: String(e) })
  }
}
