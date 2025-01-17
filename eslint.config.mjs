import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    typescript: true,
  },
  {
    // TODO remove this rule
    rules: {
      'no-restricted-syntax': [
        'error',
        'TSExportAssignment',
      ],
    },
  },
)
