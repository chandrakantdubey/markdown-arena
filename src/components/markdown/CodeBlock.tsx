import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import clsx from 'clsx';

interface CodeBlockProps {
    language?: string;
    value: string;
    className?: string;
}

export default function CodeBlock({ language, value, className }: CodeBlockProps) {
    // If no language is provided, try to extract it from the className (e.g., "language-js")
    const lang = language || (className ? className.replace("language-", "") : "text");

    return (
        <div className={clsx("relative group rounded-md overflow-hidden my-4 border border-slate-700", className)}>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    className="bg-slate-700 hover:bg-slate-600 text-xs text-white px-2 py-1 rounded"
                    onClick={() => navigator.clipboard.writeText(value)}
                >
                    Copy
                </button>
            </div>
            <SyntaxHighlighter
                language={lang}
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: '1rem', background: '#1e293b' }}
                wrapLongLines={true}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
}
