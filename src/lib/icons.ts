/**
 * Pick the icon for a link from its destination.
 *
 * Keyed on the href rather than the label on purpose: labels are translated
 * ("Live" / "En vivo") but URLs are not, so one rule covers both languages and
 * there is nothing to keep in sync.
 */
export type LinkIcon = 'mail' | 'github' | 'linkedin' | 'external';

export function iconForHref(href: string): LinkIcon {
  if (href.startsWith('mailto:')) return 'mail';
  if (/(^|\/\/|\.)github\.com\//.test(href)) return 'github';
  if (/(^|\/\/|\.)linkedin\.com\//.test(href)) return 'linkedin';
  return 'external';
}
