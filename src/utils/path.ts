export function normalizeVaultPath(input: string): string {
  const normalized = input.replace(/\\/g, "/").trim();
  const withoutLeading = normalized.replace(/^\/+/, "");
  return withoutLeading
    .split("/")
    .filter(Boolean)
    .join("/");
}

export function ensureMdExtension(input: string): string {
  return input.endsWith(".md") ? input : `${input}.md`;
}
