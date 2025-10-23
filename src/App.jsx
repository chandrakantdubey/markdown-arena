import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Header from "./components/Header";
import { getTopics } from "./utils/parseTopics";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState("intro.md");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    getTopics().then((data) => {
      setCategories(data);
      if (data.length > 0) {
        setOpenCategories({ [data[0].title]: true });
      }
    });
  }, []);

  const handleSelectTopic = (fileName) => {
    setSelectedFile(fileName);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleToggleCategory = (title) => {
    setOpenCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="flex h-screen bg-[--color-bg] font-body">
      <Sidebar
        categories={categories}
        selectedFile={selectedFile}
        onSelect={handleSelectTopic}
        isOpen={isSidebarOpen}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        openCategories={openCategories}
        onToggleCategory={handleToggleCategory}
      />
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      {/* Main content area */}
      <div className="flex-1 flex flex-col h-screen">
        <Header onMenuClick={toggleSidebar} />
        <Content file={selectedFile} />
      </div>
    </div>
  );
}
