/**
 * Strip HTML tags from user input to prevent XSS.
 * Used on text inputs before sending to API.
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Safely serialize an object as a JSON-LD string for use in
 * `dangerouslySetInnerHTML`. Escapes `<` so a `</script>` inside
 * product data cannot break out of the JSON-LD `<script>` block.
 */
export function escapeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
