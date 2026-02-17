import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import rehypeRaw from "rehype-raw";

// Initialize mermaid
mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    themeVariables: {
        fontFamily: "Inter, sans-serif",
        primaryColor: "#e0e7ff", // indigo-100
        edgeLabelBackground: "#ffffff",
        tertiaryColor: "#f1f5f9", // slate-100
    },
    securityLevel: "loose",
});

const Mermaid = ({ chart }: { chart: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState("");

    useEffect(() => {
        if (chart && ref.current) {
            const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
            mermaid
                .render(id, chart)
                .then(({ svg }) => {
                    setSvg(svg);
                })
                .catch((error) => {
                    console.error("Mermaid render error:", error);
                    setSvg(
                        `<div class="text-red-500 bg-red-50 p-2 rounded text-sm">Failed to render diagram</div>`,
                    );
                });
        }
    }, [chart]);

    return (
        <div
            className="mermaid my-6 flex justify-center bg-white p-4 rounded-lg shadow-sm border border-slate-100 overflow-x-auto"
            ref={ref}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
};

interface MarkdownViewerProps {
    content: string;
    className?: string;
}

export default function MarkdownViewer({ content, className = "" }: MarkdownViewerProps) {
    return (
        <div className={`markdown-body ${className}`}>
            <ReactMarkdown
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                remarkPlugins={[remarkGfm]}
                components={{
                    code: ({ node, inline, className, children, ...props }: any) => {
                        const match = /language-(\w+)/.exec(className || "");
                        const isMermaid = match && match[1] === "mermaid";

                        if (isMermaid) {
                            return <Mermaid chart={String(children).replace(/\n$/, "")} />;
                        }

                        return inline ? (
                            <code
                                className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200"
                                {...props}
                            >
                                {children}
                            </code>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                    pre: ({ node, children, ...props }: any) => {
                        let isMarkdown = false;
                        let codeContent = "";

                        // Robustly extract raw text from the code block, bypassing rehype-highlight
                        if (
                            node &&
                            node.children &&
                            node.children.length > 0 &&
                            node.children[0].tagName === "code"
                        ) {
                            const codeNode = node.children[0];
                            const className =
                                codeNode.properties && codeNode.properties.className
                                    ? codeNode.properties.className.join(" ")
                                    : "";

                            if (
                                className.includes("language-markdown") ||
                                className.includes("language-md")
                            ) {
                                isMarkdown = true;
                                // Extract text from the AST directly
                                codeContent = codeNode.children
                                    .map((child: any) => child.value || "")
                                    .join("");
                            }
                        }

                        if (isMarkdown) {
                            return (
                                <div className="my-10 space-y-6">
                                    {/* Syntax Section */}
                                    <div className="relative group">
                                        <div className="absolute -top-3 left-4 px-2 py-0.5 bg-slate-200 text-slate-600 text-xs font-bold rounded uppercase tracking-wide">
                                            Markdown
                                        </div>
                                        <pre
                                            className="rounded-xl shadow-sm border border-slate-200 bg-[#0d1117] overflow-x-hidden p-0 pt-6 px-4"
                                            {...props}
                                        >
                                            {children}
                                        </pre>
                                    </div>

                                    {/* Preview Section */}
                                    <div className="relative group">
                                        <div className="absolute -top-3 left-4 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded uppercase tracking-wide z-10 border border-indigo-200">
                                            Rendered Output
                                        </div>
                                        <div className="p-6 pt-8 border border-indigo-100 rounded-xl bg-white shadow-sm overflow-x-auto">
                                            <ReactMarkdown
                                                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    code: ({ node, inline, className, children, ...props }: any) => {
                                                        const match = /language-(\w+)/.exec(className || "");
                                                        const isMermaid = match && match[1] === "mermaid";

                                                        if (isMermaid) {
                                                            return <Mermaid chart={String(children).replace(/\n$/, "")} />;
                                                        }

                                                        return inline ? (
                                                            <code
                                                                className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200"
                                                                {...props}
                                                            >
                                                                {children}
                                                            </code>
                                                        ) : (
                                                            <code className={className} {...props}>
                                                                {children}
                                                            </code>
                                                        );
                                                    }
                                                }}
                                            >
                                                {codeContent}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <pre
                                className="rounded-xl shadow-sm border border-slate-200 bg-[#0d1117] overflow-x-hidden p-0 my-8 px-4"
                                {...props}
                            />
                        );
                    },
                    h1: ({ node, ...props }) => (
                        <h1
                            className="text-4xl font-extrabold tracking-tight text-slate-900 mb-8 pb-4 border-b border-slate-100"
                            {...props}
                        />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2
                            className="text-2xl font-bold tracking-tight text-slate-900 mt-12 mb-6"
                            {...props}
                        />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3
                            className="text-xl font-bold tracking-tight text-slate-800 mt-8 mb-4"
                            {...props}
                        />
                    ),
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-8 border border-slate-200 rounded-lg shadow-sm">
                            <table
                                className="min-w-full divide-y divide-slate-200"
                                {...props}
                            />
                        </div>
                    ),
                    thead: ({ node, ...props }) => (
                        <thead className="bg-slate-50" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                        <th
                            className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
                            {...props}
                        />
                    ),
                    tbody: ({ node, ...props }) => (
                        <tbody
                            className="bg-white divide-y divide-slate-100"
                            {...props}
                        />
                    ),
                    td: ({ node, ...props }) => (
                        <td
                            className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium"
                            {...props}
                        />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote
                            className="border-l-4 border-blue-500 bg-blue-50/50 pl-4 py-1 pr-1 my-6 rounded-r italic text-slate-700"
                            {...props}
                        />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
