const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['results', 'items', 'data']) {
    const value = payload[key]
    if (Array.isArray(value)) return value
    if (value && typeof value === 'object') {
      const nested = normalizeCollection(value)
      if (nested.length > 0) return nested
    }
  }

  return []
}

export async function fetchCollection(collection, signal) {
  const response = await fetch(`${apiBaseUrl}/${collection}/`, { signal })
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }

  return normalizeCollection(await response.json())
}