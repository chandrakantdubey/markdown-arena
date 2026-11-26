const key = 'markdown-arena:progress:v1'
export function completedDocuments(): string[] {
  try { const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]'); return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [] }
  catch { return [] }
}
export function setCompleted(path: string, done: boolean): boolean {
  try { const items = new Set(completedDocuments()); if (done) items.add(path); else items.delete(path); localStorage.setItem(key, JSON.stringify([...items])); return true }
  catch { return false }
}
