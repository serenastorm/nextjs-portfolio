import { BlogPostResponse } from "infrastructure/blog/types";
import { apiUrl } from "infrastructure/routes/constants";

export async function fetchEntry(slug: string): Promise<BlogPostResponse> {
  const res = await fetch(`${apiUrl}/snippet/${slug}`);
  const entry = await res.json();

  return entry;
}

export async function fetchPreviousEntry(
  slug: string
): Promise<BlogPostResponse | null> {
  const res = await fetch(`${apiUrl}/prevsnippet/${slug}`);
  const entry = await res.json();

  return entry[0] || null;
}

export async function fetchNextEntry(
  slug: string
): Promise<BlogPostResponse | null> {
  const res = await fetch(`${apiUrl}/nextsnippet/${slug}`);
  const entry = await res.json();

  return entry[0] || null;
}

export async function fetchEntries(
  entryType?: "snippets" | "changelog"
): Promise<BlogPostResponse[]> {
  const res = await fetch(`${apiUrl}/${entryType ?? "snippets"}/all`);
  const entries = await res.json();

  return entries;
}
