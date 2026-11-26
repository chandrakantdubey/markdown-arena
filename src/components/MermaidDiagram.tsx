import { useEffect, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'strict',
  theme: 'neutral',
  suppressErrorRendering: true,
  flowchart: { htmlLabels: false },
})

let renderId = 0

export default function MermaidDiagram({ chart }: { chart: string }) {
  const [result, setResult] = useState<{ chart: string; url?: string }>()
  useEffect(() => {
    let current = true
    // Coalesce keystrokes before asking Mermaid to lay out a diagram.
    const timer = setTimeout(async () => {
      try {
        const { svg } = await mermaid.render('arena-diagram-' + ++renderId, chart)
        if (current) setResult({ chart, url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg) })
      } catch {
        if (current) setResult({ chart })
      }
    }, 180)
    return () => { current = false; clearTimeout(timer) }
  }, [chart])

  if (result?.chart !== chart) return <p role="status">Drawing diagram…</p>
  return <figure>
    {result.url ? <img src={result.url} alt="Mermaid diagram. Text source follows." /> :
      <p role="status">Could not draw this diagram. Check the diagram type, labels and arrows.</p>}
    <details><summary>Diagram source</summary><pre>{chart}</pre></details>
  </figure>
}
