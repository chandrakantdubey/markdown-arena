import introductionRaw from "./content/01-introduction.md?raw";
import basicSyntaxRaw from "./content/02-basic-syntax.md?raw";
import intermediateRaw from "./content/03-intermediate.md?raw";
import advancedRaw from "./content/04-advanced.md?raw";
import diagramsRaw from "./content/05-diagrams.md?raw";
import mediaRaw from "./content/06-media-embeds.md?raw";
import platformsRaw from "./content/07-platforms.md?raw";
import editorGuideRaw from "./content/08-editor-guide.md?raw";
import referenceRaw from "./content/09-reference.md?raw";

export type TopicLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Topic {
  id: string;
  title: string;
  level: TopicLevel;
  content: string;
}

const parseMarkdown = (raw: string): Topic => {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/;
  const match = raw.match(frontmatterRegex);

  if (!match) {
    throw new Error("Invalid markdown format: Missing frontmatter");
  }

  const [, frontmatter, content] = match;
  const metadata: Record<string, string> = {};

  frontmatter.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      metadata[key.trim()] = valueParts.join(":").trim();
    }
  });

  return {
    id: metadata.id,
    title: metadata.title,
    level: metadata.level as TopicLevel,
    content: content.trim(),
  };
};

export const courseContent: Topic[] = [
  introductionRaw,
  basicSyntaxRaw,
  intermediateRaw,
  advancedRaw,
  diagramsRaw,
  mediaRaw,
  platformsRaw,
  editorGuideRaw,
  referenceRaw,
].map(parseMarkdown);
