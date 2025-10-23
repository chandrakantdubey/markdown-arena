import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  fontFamily: "inherit",
});

export default function Content({ file }) {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!file) return;

    const fetchMarkdown = async () => {
      setLoading(true);
      setError(null);
      setMarkdown("");
      try {
        const response = await fetch(`/${file}`);
        if (!response.ok) {
          throw new Error(`CONNECTION FAILED: /${file}. Check uplink.`);
        }
        const text = await response.text();
        setMarkdown(text);
      } catch (err) {
        setError(err.message);
        setMarkdown("");
      } finally {
        setLoading(false);
      }
    };
    fetchMarkdown();
  }, [file]);

  useEffect(() => {
    if (!markdown || !contentRef.current) return;
    const timer = setTimeout(() => {
      if (!contentRef.current) return;

      const mermaidBlocks = contentRef.current.querySelectorAll(
        'pre[lang="mermaid"]:not([data-processed])'
      );
      mermaidBlocks.forEach(async (preElement, index) => {
        preElement.setAttribute("data-processed", "true");
        const codeElement = preElement.querySelector("code");
        if (!codeElement) return;
        const diagramId = `mermaid-diagram-${file.replace(
          /[^a-zA-Z0-9]/g,
          ""
        )}-${index}`;
        const source = codeElement.textContent || "";
        try {
          const { svg } = await mermaid.render(diagramId, source);
          const svgContainer = document.createElement("div");
          svgContainer.innerHTML = svg;
          svgContainer.className =
            "mermaid-container flex justify-center items-center my-4 overflow-auto";
          preElement.replaceWith(svgContainer);
        } catch (e) {
          console.error(`Mermaid rendering error in ${file}:`, e.message);
          const errorNode = document.createElement("div");
          errorNode.innerHTML = `<strong>Mermaid Syntax Error:</strong><br><pre class="text-sm p-2 bg-red-900/50 rounded mt-2">${e.message}</pre>`;
          errorNode.className =
            "text-red-400 p-3 my-4 border border-red-500/50 rounded bg-red-500/10";
          preElement.replaceWith(errorNode);
        }
      });

      const tabContainers = contentRef.current.querySelectorAll(
        ".code-tabs:not([data-processed])"
      );
      tabContainers.forEach((container) => {
        container.setAttribute("data-processed", "true");
        const buttons = container.querySelectorAll(".tab-button");
        const contents = container.querySelectorAll(".tab-content");
        buttons.forEach((button) => {
          const newButton = button.cloneNode(true);
          button.parentNode.replaceChild(newButton, button);
          newButton.addEventListener("click", () => {
            const lang = newButton.getAttribute("data-lang");
            buttons.forEach((btn) => btn.classList.remove("active"));
            newButton.classList.add("active");
            contents.forEach((content) => {
              content.classList.toggle(
                "active",
                content.getAttribute("data-lang") === lang
              );
            });
          });
        });
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [markdown, file]);

  return (
    <main className="flex-1 overflow-y-auto bg-[--color-bg]">
      <div ref={contentRef} className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        {loading && (
          <p className="text-2xl text-center mt-12 glitch-text">
            SYNCING DATASTREAM...
          </p>
        )}
        {error && (
          <p className="text-[--color-error] bg-[--color-error]/10 border-2 border-[--color-error]/50 p-4 rounded-md font-bold">
            [SYSTEM ALERT] {error}
          </p>
        )}
        {!loading && !error && markdown && (
          <div className="wmde-markdown-var">
            <MDEditor.Markdown source={markdown} className="prose max-w-none" />
          </div>
        )}
      </div>
    </main>
  );
}
