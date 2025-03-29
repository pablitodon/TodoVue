export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'selector-class-pattern': null,
    'no-empty-source': null,
    'scss/comment-no-empty': true,
    'declaration-property-value-no-unknown': true,
  },
};
