import { useState } from "react";
import MarkdownViewer from "../components/MarkdownViewer";

const defaultMarkdown = `# Welcome to the Markdown Arena!

This is your playground. Type on the left, see the result on the right.

## Features

- **Bold** and *Italic* text
- [Links](https://example.com) and images
- Lists (ordered and unordered)
- Code blocks
- Tables
- And even Mermaid diagrams!

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

\`\`\`mermaid
graph TD;
    A[Start] --> B{Is it working?};
    B -- Yes --> C[Great!];
    B -- No --> D[Debug];
    D --> B;
\`\`\`
`;

export default function MarkdownEditor() {
    const [markdown, setMarkdown] = useState(defaultMarkdown);

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-4">
            {/* Editor Pane */}
            <div className="flex-1 flex flex-col h-full bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">
                        Editor
                    </h2>
                    <span className="text-xs text-slate-500">Markdown</span>
                </div>
                <textarea
                    className="flex-1 w-full p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500/50"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="Type your markdown here..."
                />
            </div>

            {/* Preview Pane */}
            <div className="flex-1 flex flex-col h-full bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">
                        Preview
                    </h2>
                    <span className="text-xs text-slate-500">Rendered</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-white">
                    <article className="prose prose-slate prose-sm md:prose-base w-full max-w-none prose-p:text-slate-700 prose-headings:text-slate-900 prose-li:text-slate-700 prose-strong:text-slate-900">
                        <MarkdownViewer content={markdown} />
                    </article>
                </div>
            </div>
        </div>
    );
}

