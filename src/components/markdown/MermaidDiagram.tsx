import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
    chart: string;
}

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
});

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const renderChart = async () => {
            if (!chart) return;

            try {
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                // mermaid.render returns an object { svg } in newer versions
                const { svg } = await mermaid.render(id, chart);

                if (isMounted) {
                    setSvg(svg);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Mermaid error:", err);
                    setError("Failed to render diagram. Check syntax.");
                }
            }
        };

        renderChart();

        return () => {
            isMounted = false;
        };
    }, [chart]);

    if (error) {
        return (
            <div className="p-4 border border-red-800 bg-red-900/20 text-red-300 rounded font-mono text-sm">
                {error}
                <pre className="mt-2 text-xs opacity-50">{chart}</pre>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className="mermaid-diagram my-6 flex justify-center bg-slate-900/50 p-4 rounded-lg overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
