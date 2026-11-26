import { lazy, Suspense } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import CodeBlock from './CodeBlock'
import { courseLink } from '../course/catalog'

const MermaidDiagram = lazy(() => import('./MermaidDiagram'))

export default function MarkdownViewer({ content, documentPath }: { content: string; documentPath: string }) {
  return <article className="md-prose">
    <ReactMarkdown remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }], rehypeSanitize]}
      components={{
        a({ href = '', children, id, title, className, 'aria-label': label, 'aria-describedby': description }) {
          // The sanitizer namespaces IDs, including those generated for headings and footnotes.
          const target = href.startsWith('#') ? '#user-content-' + href.slice(1) : courseLink(href, documentPath)
          const props = { id, title, className, 'aria-label': label,
            'aria-describedby': description?.split(' ').map(value => 'user-content-' + value).join(' ') }
          if (/^\/(?:arena|core|advanced|visuals)?(?:[?#]|$)/.test(target)) {
            return <Link {...props} to={target}>{children}</Link>
          }
          return <a {...props} href={target || undefined}>{children}</a>
        },
        img({ src, alt, title }) {
          return <img src={typeof src === 'string' ? courseLink(src, documentPath) : undefined}
            alt={alt ?? ''} title={title} loading="lazy" />
        },
        pre({ node, children }) {
          const code = node?.children[0]
          if (code?.type !== 'element' || code.tagName !== 'code') return <pre>{children}</pre>
          const classes = code.properties.className
          const language = Array.isArray(classes)
            ? classes.map(String).find(name => name.startsWith('language-'))?.slice(9) : undefined
          const value = code.children.map(child => child.type === 'text' ? child.value : '').join('').replace(/\n$/, '')
          if (language === 'mermaid') return <Suspense fallback={<pre>{value}</pre>}>
            <MermaidDiagram chart={value} />
          </Suspense>
          return <CodeBlock language={language} value={value} />
        },
      }}>{content}</ReactMarkdown>
  </article>
}
