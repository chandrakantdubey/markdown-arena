import ReactMarkdown from 'react-markdown';
import MermaidDiagram from './MermaidDiagram';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import CodeBlock from './CodeBlock';
import clsx from 'clsx';

interface MarkdownViewerProps {
    content: string;
    className?: string;
}

export default function MarkdownViewer({ content, className }: MarkdownViewerProps) {
    return (
        <div className={clsx("md-prose", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                    rehypeRaw,
                    [rehypeSanitize, {
                        ...defaultSchema,
                        attributes: {
                            ...defaultSchema.attributes,
                            div: [['className']],
                            span: [['className']],
                            code: [['className']],
                            img: [['src', 'alt', 'title', 'width', 'height', 'className']],
                        }
                    }],
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }]
                ]}
                components={{
                    code(props: any) {
                        const { children, className, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || '');
                        const inline = !match && !String(children).includes('\n');

                        if (inline) {
                            return <code {...rest} className="md-inline-code">{children}</code>;
                        }

                        const lang = match?.[1];

                        if (lang === 'mermaid') {
                            return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />;
                        }

                        return (
                            <CodeBlock
                                language={lang}
                                value={String(children).replace(/\n$/, '')}
                                className={className}
                            />
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
