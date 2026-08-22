import { execSync } from 'node:child_process';

/**
 * Where the deployed page came from, resolved once at build time.
 *
 * The date is the last *commit* date, not the build date: a rebuild with no
 * changes should not advertise itself as an update. "Last updated" only means
 * something if it tracks the content.
 *
 * Hosts usually strip `.git` from the build image but expose the commit through
 * the environment, so that is tried first. Everything degrades to null — a
 * missing footer line is nothing, a footer line that lies is worse.
 */

export interface BuildInfo {
  /** Short commit SHA, or null when it cannot be determined. */
  commit: string | null;
  /** ISO date of that commit, or null. */
  date: string | null;
}

function fromEnv(): BuildInfo | null {
  const env = process.env;
  const sha =
    env.VERCEL_GIT_COMMIT_SHA ?? // Vercel
    env.COMMIT_REF ?? //           Netlify
    env.CF_PAGES_COMMIT_SHA ?? //  Cloudflare Pages
    env.GITHUB_SHA; //             GitHub Actions
  if (!sha) return null;
  // No commit date in any of these, so fall back to the build moment. It is the
  // closest honest answer available on a host that stripped the repository.
  return { commit: sha.slice(0, 7), date: new Date().toISOString().slice(0, 10) };
}

function fromGit(): BuildInfo | null {
  try {
    const commit = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    const date = execSync('git log -1 --format=%cs', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    return commit ? { commit, date: date || null } : null;
  } catch {
    return null;
  }
}

export const buildInfo: BuildInfo = fromGit() ?? fromEnv() ?? { commit: null, date: null };

/** Formats the commit date for a given locale, e.g. "22 Aug 2026". */
export function formatBuildDate(iso: string, lang: 'en' | 'es'): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(lang === 'es' ? 'es-AR' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
