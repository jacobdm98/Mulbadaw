import { readFileSync, writeFileSync } from 'node:fs';

const packagePath = new URL('../node_modules/@sanity/astro/dist/sanity-astro.mjs', import.meta.url);
const source = readFileSync(packagePath, 'utf8');
// require.resolve returns Windows separators, but the upstream regex strips only forward slashes.
const buggyExpression = String.raw`.replace(/\/package\.json$/, "")`;
const fixedExpression = String.raw`.replace(/[\\/]package\.json$/, "")`;

if (source.includes(fixedExpression)) {
  process.exit(0);
}

const matches = source.split(buggyExpression).length - 1;
if (matches !== 1) {
  throw new Error(`Expected one Windows-incompatible path expression in ${packagePath}, found ${matches}.`);
}

writeFileSync(packagePath, source.replace(buggyExpression, fixedExpression));
