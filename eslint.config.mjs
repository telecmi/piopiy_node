const globals = require( "globals" );
const pluginJs = require( "@eslint/js" );



export default [
  {
    languageOptions: { globals: globals.node },
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "no-undef": "error",
      "no-constant-condition": "error",
      "no-implicit-coercion": "error",
      "no-unused-labels": "error",
      "no-console": "error",
      "prefer-const": ["error", { "ignoreReadBeforeAssign": true }]
    }

  },
  pluginJs.configs.recommended,
];