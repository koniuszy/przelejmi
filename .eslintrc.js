module.exports = {
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:import/typescript',
    'plugin:@next/next/recommended',
  ],
  plugins: ['import', 'react-hooks', 'jsx-a11y'],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/no-extraneous-dependencies': [
      2,
      { devDependencies: ['**/*.test.*', '**/*.stories.*'] },
    ],
    'import/no-anonymous-default-export': 0,
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    'import/extensions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/no-namespace': 'off',
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/self-closing-comp': ['error'],
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: true,
      },
    ],

    'react/jsx-no-constructed-context-values': 'off',

    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-unused-expressions': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-duplicate-imports': ['error', { includeExports: true }],
    quotes: [1, 'single'],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'block' },
      { blankLine: 'always', prev: 'block', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
    'jsx-quotes': ['warn', 'prefer-double'],

    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@chakra-ui/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'src/generated/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'src/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
}
