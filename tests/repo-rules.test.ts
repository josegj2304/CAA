// @vitest-environment node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const readRepoFile = (path: string): string => readFileSync(repoRoot + path, 'utf8');

interface PackageJson {
  engines?: { node?: string };
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

const pkg = JSON.parse(readRepoFile('package.json')) as PackageJson;
const directDeps: Record<string, string> = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
};

// An exact semver version: no ^, ~, ranges, tags or URLs.
const EXACT_VERSION = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;

/** Package names listed in the "Dependencias aprobadas" table of docs/decisiones.md. */
function approvedPackages(): Set<string> {
  const doc = readRepoFile('docs/decisiones.md');
  const start = doc.indexOf('## Dependencias aprobadas');
  if (start === -1) {
    throw new Error('docs/decisiones.md has no "Dependencias aprobadas" section');
  }
  const nextSection = doc.indexOf('\n## ', start + 1);
  const section = doc.slice(start, nextSection === -1 ? undefined : nextSection);
  const names = new Set<string>();
  for (const match of section.matchAll(/^\|\s*`([^`]+)`\s*\|/gm)) {
    names.add(match[1]);
  }
  return names;
}

describe('repository rules', () => {
  it('(a) pins every dependency to an exact version', () => {
    expect(Object.keys(directDeps).length).toBeGreaterThan(0);
    const notExact = Object.entries(directDeps).filter(([, version]) => !EXACT_VERSION.test(version));
    expect(notExact).toEqual([]);
  });

  it('(b) lists every direct dependency in docs/decisiones.md with its license', () => {
    const approved = approvedPackages();
    const missing = Object.keys(directDeps).filter((name) => !approved.has(name));
    expect(missing).toEqual([]);
  });

  it('(c) pins the same exact Node version in engines.node and .node-version', () => {
    const engine = pkg.engines?.node;
    expect(engine).toMatch(EXACT_VERSION);
    expect(readRepoFile('.node-version').trim()).toBe(engine);
  });
});
