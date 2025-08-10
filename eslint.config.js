import js from '@eslint/js';
import tsplugin from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import { globalIgnores } from 'eslint/config';
import expoConfig from 'eslint-config-expo/flat.js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintComments from 'eslint-plugin-eslint-comments';
import reactPlugin from 'eslint-plugin-react';
import security from 'eslint-plugin-security';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import {
  config as createConfig,
  configs as tsConfigs,
} from 'typescript-eslint';

export default createConfig([
  globalIgnores(['dist', 'android', 'ios']),
  js.configs.recommended,
  tsConfigs.recommended,
  expoConfig,
  {
    ignores: [
      '.prettierrc.cjs',
      'dist',
      'node_modules',
      '__mocks__',
      'src/graphql/__generated__',
    ],
  },
  {
    files: ['**/*.{js,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': tsplugin,
      'eslint-comments': eslintComments,
      security: security,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    extends: [eslintConfigPrettier],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      // 🧠 TypeScript Enhancements
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
      '@typescript-eslint/switch-exhaustiveness-check': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'warn',
        {
          name: 'react-redux',
          importNames: ['useSelector', 'useDispatch'],
          message: '⚠️ Use typed hooks: `useAppDispatch` and `useAppSelector`.',
        },
      ],

      // ⚛️ React Rules
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'off',
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],

      // 🔒 Security & Comments
      'eslint-comments/no-unlimited-disable': 'error',
      'eslint-comments/no-unused-disable': 'warn',
      'security/detect-object-injection': 'off',

      // 🖨️ Console Usage
      'no-console': 'warn',

      // 🧹 Unused Imports
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // 🧱 Import Sorting
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^@?\\w', '^\\u0000'],
            ['^.+\\.s?css$'],
            ['^@/lib', '^@/hooks'],
            ['^@/data'],
            ['^@/components', '^@/container'],
            ['^@/store'],
            ['^@/'],
            [
              '^\\./?$',
              '^\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\./\\.\\.(?!/?$)',
            ],
            ['^@/types'],
            ['^'],
          ],
        },
      ],
    },
  },
]);
