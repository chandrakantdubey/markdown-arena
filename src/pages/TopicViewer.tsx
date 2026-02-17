import { useParams, Navigate } from "react-router";
import { courseContent } from "../data/moduleRegistry";
import MarkdownViewer from "../components/MarkdownViewer";

export default function TopicViewer() {
  const { topicId } = useParams();
  const topic = courseContent.find((t) => t.id === topicId);

  if (!topic) {
    return <Navigate to="/intro" replace />;
  }

  return (
    <article className="prose prose-slate prose-lg w-full max-w-none prose-p:text-slate-700 prose-headings:text-slate-900 prose-li:text-slate-700 prose-strong:text-slate-900">
      <div className="bg-white py-4 md:py-6 px-8 rounded-lg">
        <div className="flex items-center space-x-3 mb-8">
          <span
            className={`px-2.5 py-1 text-xs font-bold rounded-md uppercase tracking-wide ${topic.level === "Beginner"
              ? "bg-teal-50 text-teal-700 border border-teal-100"
              : topic.level === "Intermediate"
                ? "bg-blue-50 text-blue-700 border border-blue-100"
                : "bg-indigo-50 text-indigo-700 border border-indigo-100"
              }`}
          >
            {topic.level}
          </span>
          <span className="text-slate-400 text-sm font-medium">
            #{topic.id}
          </span>
        </div>

        <MarkdownViewer content={topic.content} />
      </div>
    </article>
  );
}

