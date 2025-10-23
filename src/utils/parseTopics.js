// A helper to convert a string to a URL-friendly slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export async function getTopics() {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}data.md`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data.md");
    }
    const markdown = await response.text();

    const lines = markdown.split("\n");
    const categories = [];
    let currentCategory = null;

    for (const line of lines) {
      if (line.startsWith("### **")) {
        const title = line.replace("### **", "").replace("**", "").trim();
        currentCategory = { title, topics: [] };
        categories.push(currentCategory);
      } else if (line.match(/^\d+\.\s+\*\*/) && currentCategory) {
        const title = line
          .replace(/^\d+\.\s+\*\*/, "")
          .replace(/\*\*/, "")
          .trim();
        // The user provided one file already, we use its name as an example
        // Otherwise, we generate a slug.
        let fileName;
        if (title === "API Rate Limiting and Throttling") {
          fileName = "api-rate-limiting-and-throttling.md";
        } else {
          fileName = `${slugify(title)}.md`;
        }

        currentCategory.topics.push({ title, fileName });
      }
    }

    // For any topic files you create, name them using this slugified format.
    // For example: "HTML & Semantics" should be a file named `public/html-semantics.md`

    return categories;
  } catch (error) {
    console.error("Error parsing topics:", error);
    return []; // Return empty array on error
  }
}
