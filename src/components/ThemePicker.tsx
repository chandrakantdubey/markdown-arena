import { useEffect, useState } from 'react'
type Theme = 'light' | 'dark' | 'system'
function initial(): Theme {
  try { const value = localStorage.getItem('markdown-arena:theme'); return value === 'light' || value === 'dark' ? value : 'system' }
  catch { return 'system' }
}
export default function ThemePicker() {
  const [theme,setTheme] = useState<Theme>(initial)
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)')
    function apply() { document.documentElement.dataset.theme = theme === 'system' ? (media.matches ? 'dark' : 'light') : theme }
    apply(); media.addEventListener('change',apply)
    try { localStorage.setItem('markdown-arena:theme',theme) } catch { /* storage optional */ }
    return () => media.removeEventListener('change',apply)
  },[theme])
  return <label className="theme-picker"><span>Theme</span><select aria-label="Theme" value={theme} onChange={e => setTheme(e.target.value as Theme)}><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></label>
}
