import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Loading from "./pages/Loading";

const CourseLayout = lazy(() => import("./layouts/CourseLayout"));
const TopicViewer = lazy(() => import("./pages/TopicViewer"));
const MarkdownEditor = lazy(() => import("./pages/MarkdownEditor"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<CourseLayout />}>
            <Route index element={<TopicViewer />} />
            <Route path="playground" element={<MarkdownEditor />} />
            <Route path=":topicId" element={<TopicViewer />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
