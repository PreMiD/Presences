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
      'new-cap': [
        'error',
        { newIsCapExceptions: ['iFrame'], capIsNew: false, newIsCap: true, properties: true },
      ],
      'jsonc/sort-keys': [
        'error',
        {
          pathPattern: '^$',
          order: [
            '$schema',
            'apiVersion',
            'author',
            'contributors',
            'service',
            'altnames',
            'description',
            'url',
            'regExp',
            'version',
            'logo',
            'thumbnail',
            'color',
            'category',
            'tags',
            'iframe',
            'iFrameRegExp',
            'readLogs',
            'settings',
          ],
        },
        {
          pathPattern: '^settings$',
          order: ['id', 'title', 'icon', 'value', 'placeholder', 'if'],
        },
        {
          pathPattern: '^settings\\.if$',
          order: { type: 'asc' },
        },
        {
          pathPattern: '^description$',
          order: { type: 'asc' },
        },
      ],
    },
  },
)
