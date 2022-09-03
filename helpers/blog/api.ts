import { BlogPostResponse } from "infrastructure/blog/types";
import { apiUrl } from "infrastructure/routes/constants";

export async function fetchEntry(slug: string): Promise<BlogPostResponse> {
  const res = await fetch(`${apiUrl}/snippet/${slug}`);
  const entry = await res.json();

  return entry;
}

export async function fetchRelatedEntries(slug: string): Promise<{
  previous: BlogPostResponse | null;
  next: BlogPostResponse | null;
}> {
  const previousEntryRes = await fetch(`${apiUrl}/prevsnippet/${slug}`);
  const previousEntry = await previousEntryRes.json();
  const nextEntryRes = await fetch(`${apiUrl}/nextsnippet/${slug}`);
  const nextEntry = await nextEntryRes.json();

  return { previous: previousEntry[0] || null, next: nextEntry[0] || null };
}

export async function fetchEntries(
  entryType?: "snippets" | "changelog"
): Promise<BlogPostResponse[]> {
  const res = await fetch(`${apiUrl}/${entryType ?? "snippets"}/all`);
  const entries = await res.json();

  return entries;
}
