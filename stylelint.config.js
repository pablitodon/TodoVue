/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-recommended-vue",
    "stylelint-config-recommended-vue/scss",
  ],
  "overrides": [
    {
      "files": ["*.vue", "**/*.vue"],
      "rules": {
      }
    }
  ]
}