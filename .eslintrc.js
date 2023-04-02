module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es2021: true
  },

  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      './tsconfig.json'
    ]
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    '@typescript-eslint/space-before-function-paren': 0,
    "@typescript-eslint/prefer-nullish-coalescing": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "@typescript-eslint/ban-types": 0
  }
}
