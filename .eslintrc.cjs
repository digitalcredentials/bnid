module.exports = {
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      extends: 'standard-with-typescript',
      parserOptions: {
        project: './tsconfig.spec.json'
      },
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off'
      }
    }
  ]
}
