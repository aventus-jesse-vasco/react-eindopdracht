export function extractVideoId(input: string) {
  const url = input.trim();
  if (!url) return null;

  const match = url.match(/\/video\/(\d+)/);
  if (match?.[1]) return match[1];

  // Fallback: sometimes the ID is the longest number in the URL
  const numbers = url.match(/\d{8,}/g);
  if (!numbers?.length) return null;

  return numbers.sort((a, b) => b.length - a.length)[0] ?? null;
}

