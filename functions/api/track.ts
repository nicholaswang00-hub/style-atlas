interface Env {
  HEAT: KVNamespace
}

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...cors } })

export const onRequestOptions = async () => new Response(null, { headers: cors })

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  try {
    const body = (await request.json()) as { id?: string; action?: string }
    const id = typeof body.id === 'string' ? body.id : ''
    const action = body.action ?? ''
    if (!id || id.length > 64 || !['view', 'copy', 'share'].includes(action)) {
      return json({ ok: false }, 400)
    }
    const key = `${action}:${id}`
    const next = Number((await env.HEAT.get(key)) ?? 0) + 1
    await env.HEAT.put(key, String(next))
    return json({ ok: true })
  } catch {
    return json({ ok: false }, 500)
  }
}
