import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import checkFile from 'eslint-plugin-check-file';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended, 
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts.tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      'check-file': checkFile,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/!(__tests__)': 'KEBAB_CASE',
        },
      ],

      // 
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // 
            {
              target: './src/features',
              from: './src/app',
            },
            {
              target: [
                './src/components/',
                './src/hooks',
                './src/lib/',
                './src/types',
                './src/utils',
              ],
              from: ['./src/features', './src/app/']
            },
          ],
        },
      ],
    },
  },
];
