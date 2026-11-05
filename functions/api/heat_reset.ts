// 一次性清榜端点：清完即删
interface KVNS {
  delete(key: string): Promise<void>
  list(opts?: { prefix?: string }): Promise<{ keys?: unknown[] }>
}
declare const HEAT: KVNS

export const onRequestGet = async ({ request }: { request: Request }) => {
  const url = new URL(request.url)
  if (url.searchParams.get('confirm') !== 'reset-heat-2026') {
    return new Response('forbidden', { status: 403 })
  }
  const listed = await HEAT.list({ prefix: '' })
  let n = 0
  for (const k of listed.keys ?? []) {
    const name = typeof k === 'string' ? k : ((k as { key?: string }).key ?? '')
    if (name) {
      await HEAT.delete(name)
      n++
    }
  }
  return new Response(JSON.stringify({ deleted: n }), { headers: { 'Content-Type': 'application/json' } })
}
