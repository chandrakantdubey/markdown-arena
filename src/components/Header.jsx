export default function Header({ onMenuClick }) {
  return (
    <header className="md:hidden flex items-center justify-between bg-[--color-bg-secondary]/80 backdrop-blur-md p-4 border-b-2 border-[--color-neon-violet] sticky top-0 z-10">
      <h1
        className="text-xl font-bold text-[--color-neon-blue] uppercase tracking-widest font-heading"
        style={{ textShadow: "0 0 8px var(--color-neon-blue)" }}
      >
        DATA-NODE
      </h1>
      <button
        onClick={onMenuClick}
        className="p-2 rounded-md hover:bg-[--color-neon-blue]/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[--color-neon-blue]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
}
