module.exports = {
  extends:[
    "stylelint-config-standard",
  ],
  ignoreFiles: [
    "**/node_modules/**/*.*", 
    "**/dist/**/*.*", 
    "**/build/**/*.*", 
    "**/coverage/**/*.*", 
    "**/public/**/*.*"
  ],
  rules:{
    "no-descending-specificity": null,
    "color-function-notation": null,
    "alpha-value-notation": null,
    "no-empty-source": null,
    "max-nesting-depth": 6,
    "selector-max-compound-selectors": 6,
    "selector-class-pattern": null,
    "selector-pseudo-class-no-unknown": [true, {
        "ignorePseudoClasses": ["global"]
      }
    ],
    "selector-no-qualifying-type": null
  }
}