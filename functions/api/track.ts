// EdgeOne Makers KV：命名空间绑定后作为【全局变量】注入（变量名 HEAT），不是 env 属性
// EdgeOne KV 的 key 仅支持数字/字母/下划线，故键格式为 `${action}_${enc(id)}`，
// 词条 id 内的连字符转下划线（项目内 id 均不含下划线，编码可逆）
interface KVNS {
  get(key: string): Promise<string | null>
  put(key: string, value: string): Promise<void>
}
declare const HEAT: KVNS

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...cors } })

export const onRequestOptions = async () => new Response(null, { headers: cors })

export const onRequestPost = async ({ request }: { request: Request }) => {
  try {
    const body = (await request.json()) as { id?: string; action?: string }
    const id = typeof body.id === 'string' ? body.id : ''
    const action = body.action ?? ''
    if (!id || id.length > 64 || !['view', 'copy', 'share'].includes(action)) {
      return json({ ok: false }, 400)
    }
    const key = `${action}_${id.replace(/-/g, '_')}`
    const next = Number((await HEAT.get(key)) ?? 0) + 1
    await HEAT.put(key, String(next))
    return json({ ok: true })
  } catch {
    return json({ ok: false }, 500)
  }
}
