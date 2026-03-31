/**
 * Type-safe localStorage helpers.
 * Keys are namespaced under 'coinbank:' to avoid collisions.
 */

const PREFIX = 'coinbank:'

function key(k: string) {
  return `${PREFIX}${k}`
}

export const storage = {
  get<T>(k: string): T | null {
    try {
      const raw = localStorage.getItem(key(k))
      return raw ? (JSON.parse(raw) as T) : null
    } catch {
      return null
    }
  },

  set<T>(k: string, value: T): void {
    try {
      localStorage.setItem(key(k), JSON.stringify(value))
    } catch {
      // Storage might be full or unavailable
    }
  },

  remove(k: string): void {
    localStorage.removeItem(key(k))
  },

  clear(): void {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k))
  },
}
