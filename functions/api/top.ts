// 临时调试版 v4：只 dump list 原始返回
interface KVNS {
  list(opts?: { prefix?: string }): Promise<unknown>
}
declare const HEAT: KVNS

export const onRequestGet = async () => {
  try {
    const listed = await HEAT.list({ prefix: '' })
    return new Response(JSON.stringify({ debug: 'v4', raw: listed }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ debug: 'v4', error: String(e) }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
}
export const onRequestOptions = async () => new Response(null, {
  headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' },
})
