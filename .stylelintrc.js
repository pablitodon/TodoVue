
export default {
    extends: [
        "stylelint-config-standard-scss",
        "stylelint-config-recommended-vue/scss"
    ],
    plugins: ["stylelint-scss"],
    rules: {
        "selector-class-pattern": null, // Отключить проверку на шаблон имен классов
        "no-empty-source": null,// Отключить проверку на пустые источники
        "scss/comment-no-empty": true,
        "declaration-property-value-no-unknown": true,
    }
}
