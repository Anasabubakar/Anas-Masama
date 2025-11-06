// Minimal flat config so ESLint v9 finds a config file and can run.
// This intentionally keeps rules minimal to avoid breaking the repo; you
// can expand rules later (for example to enforce next/core-web-vitals).
module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {},
  },
];
