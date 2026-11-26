import { useState } from 'react'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CodeBlock({ language, value }: { language?: string; value: string }) {
  const [status, setStatus] = useState('')
  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setStatus('Copied')
    } catch { setStatus('Select the code to copy it manually.') }
  }
  return <div className="code-example">
    <div className="code-tools"><span>{language || 'text'}</span>
      <span role="status">{status}</span><button onClick={copy}>Copy</button>
    </div>
    <SyntaxHighlighter language={language ?? 'text'} style={vscDarkPlus}
      customStyle={{ margin: 0, borderRadius: 0, fontSize: '0.86rem' }}>{value}</SyntaxHighlighter>
  </div>
}
