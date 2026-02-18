import { Routes, Route } from "react-router";
import Arena from "./pages/Arena";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Arena />} />
      <Route path="/tutorial" element={<Arena />} />
      <Route path="/foundations" element={<Arena />} />
      <Route path="/core" element={<Arena />} />
      <Route path="/extended" element={<Arena />} />
      <Route path="/advanced" element={<Arena />} />
      <Route path="/visuals" element={<Arena />} />
      <Route path="/reference" element={<Arena />} />
      <Route path="/arena" element={<Arena />} />
    </Routes>
  );
}
