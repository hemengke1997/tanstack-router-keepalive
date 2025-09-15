import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'no-console': 'off',
      'ts/consistent-type-definitions': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
    },
    stylistic: {
      quotes: 'single',
    },
  },
)
