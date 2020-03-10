module.exports = {
  plugins: ["import"],
  rules: {
    // Enforce named exports over default exports
    "import/no-default-export": "error",
    "import/prefer-default-export": "off",

    // No parameter reassignment, we should not allow function params to be reassigned
    "no-param-reassign": [2, { props: false }],

    // No new classes without assigning them to a variable.
    "no-new": 0,

    // Allow using e.g. _id variable names
    "no-underscore-dangle": "off",

    // Reduce the amount of cyclomatic complexity in functions
    complexity: ["warn", 8]
  }
};
