import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

/**
 * Flat config, used directly.
 *
 * `eslint-config-next` v16 ships native flat-config arrays, so wrapping it in
 * FlatCompat (the older pattern, still in most templates) throws
 * "Converting circular structure to JSON" — the eslintrc compat layer tries to
 * JSON-serialise a plugin object that self-references. Import the arrays instead.
 */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: ['out/**', '.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
];

export default eslintConfig;
