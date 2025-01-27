module.exports = {
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 0
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      extends: 'standard-with-typescript',
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  ]
}
