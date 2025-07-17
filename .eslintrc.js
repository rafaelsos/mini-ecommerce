module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        bracketSameLine: false,
        arrowParens: 'avoid',
        semi: false,
        useTabs: false,
        tabWidth: 2,
        printWidth: 80,
        bracketSpacing: true,
      },
    ],
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-shadow': 'off',
  },
}
