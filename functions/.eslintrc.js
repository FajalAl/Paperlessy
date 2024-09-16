import globals from 'globals';

export default {
  env: {
    es6: true,
    node: true,
  },
  parser: '@babel/eslint-parser', // Use Babel parser for modern JS
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
  },
  extends: [
    'eslint:recommended',
    'google',
    'plugin:react/recommended',
  ],
  plugins: [
    'react',
  ],
  rules: {
    'no-restricted-globals': ['error', 'name', 'length'],
    'prefer-arrow-callback': 'error',
    'quotes': ['error', 'double', { 'allowTemplateLiterals': true }],
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'warn',
  },
  globals: {
    ...globals.browser,
    ...globals.node,
    // Remove or comment this line if not needed
    // module: 'writable',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.spec.*'],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
};
