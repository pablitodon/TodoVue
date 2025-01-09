import ts from '@typescript-eslint/parser'; // Парсер TypeScript для ESLint
import vue from 'eslint-plugin-vue'; // Плагин ESLint для Vue
import importPlugin from 'eslint-plugin-import'; // Плагин ESLint для импортов

/** @type {import('eslint').Linter.Config} */
export default [
   {
      ignores: ['dist/**/*', 'node_modules/**/*'],
   },
   {
      files: ['**/*.{js,mjs,cjs,ts,vue}'],
      languageOptions: {
         parser: ts,
         parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            tsconfigRoot: './',
            extraFileExtensions: ['vue'],
         },
         globals: {},
      },
      plugins: {
         vue,
         import: importPlugin,
      },
      rules: {
         'vue/script-setup-uses-vars': 'error',
         'vue/no-unused-vars': 'warn',
         'vue/no-multiple-template-root': 'off',
      },
   },
];
