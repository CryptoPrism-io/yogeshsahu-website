import { posts, getPost, getPostsByKind, getPostsByTag, type PostKind, type Post } from "./posts";

export type JournalTag = PostKind;
export type JournalEntry = Post;

export const journal: JournalEntry[] = getPostsByKind("journal");

export function getJournalEntry(slug: string): JournalEntry | undefined {
  return getPost(slug);
}

export function getAllJournalSlugs(): string[] {
  return journal.map((j) => j.slug);
}

export function getJournalByTag(tag: JournalTag): JournalEntry[] {
  return getPostsByTag(tag);
}

export const JOURNAL_TAGS: { id: JournalTag; label: string; description: string }[] = [
  { id: "journal", label: "Journal", description: "Weekly Friday reflections" },
];

// Re-export for compatibility
export { posts };
