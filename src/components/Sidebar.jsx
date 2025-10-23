import { useMemo } from "react";

const ChevronIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-4 w-4 text-[--color-neon-blue] transition-transform duration-200 ${
      isOpen ? "rotate-90" : ""
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export default function Sidebar({
  categories,
  selectedFile,
  onSelect,
  isOpen,
  searchTerm,
  onSearchChange,
  openCategories,
  onToggleCategory,
}) {
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    const lowercasedFilter = searchTerm.toLowerCase();
    const categoriesWithFilteredTopics = categories.map((category) => ({
      ...category,
      topics: category.topics.filter((topic) =>
        topic.title.toLowerCase().includes(lowercasedFilter)
      ),
    }));
    return categoriesWithFilteredTopics.filter(
      (category) =>
        category.title.toLowerCase().includes(lowercasedFilter) ||
        category.topics.length > 0
    );
  }, [searchTerm, categories]);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-72 bg-[--color-bg-secondary]/80 backdrop-blur-md border-r-2 border-[--color-neon-violet] text-[--color-text-dim] flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-5 border-b-2 border-[--color-neon-violet]/70">
        <h1
          className="text-xl font-bold text-[--color-neon-blue] uppercase tracking-widest font-heading"
          style={{ textShadow: "0 0 8px var(--color-neon-blue)" }}
        >
          DATA-NODE
        </h1>
      </div>

      <div className="p-4">
        <input
          type="text"
          placeholder="Search Protocols..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[--color-bg] text-[--color-text] placeholder-[--color-text-dim] rounded-md py-2 px-3 border border-[--color-neon-pink]/50 focus:outline-none focus:ring-2 focus:ring-[--color-neon-pink] focus:border-[--color-neon-pink]"
        />
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {filteredCategories.map((category) => {
          const isCategoryOpen = openCategories[category.title];
          return (
            <div key={category.title}>
              <button
                onClick={() => onToggleCategory(category.title)}
                className="w-full flex items-center justify-between text-left text-xs font-bold text-[--color-neon-blue] uppercase tracking-wider mb-2 hover:text-white font-heading"
              >
                <span>{category.title}</span>
                <ChevronIcon isOpen={isCategoryOpen} />
              </button>

              {isCategoryOpen && (
                <ul className="space-y-1 pl-2 border-l border-[--color-neon-blue]/30">
                  {category.topics.map((topic) => (
                    <li key={topic.fileName}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onSelect(topic.fileName);
                        }}
                        className={`block py-1.5 px-3 rounded-md text-sm transition-all duration-200 ${
                          selectedFile === topic.fileName
                            ? "bg-[--color-neon-pink] text-white font-bold shadow-[0_0_10px_var(--color-neon-pink)]"
                            : "hover:bg-[--color-neon-pink]/20 hover:text-[--color-neon-pink]"
                        }`}
                      >
                        {topic.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
