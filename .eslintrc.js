const globalRules = {
  semi: ['error', 'always'],
  'comma-dangle': ['error', 'always-multiline'],
  'babel/semi': 1,
};
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  root: true,
  parser: 'babel-eslint',
  extends: [
    'standard',
  ],
  plugins: [
    'babel',
  ],
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: globalRules,
  overrides: [
    {
      files: [
          "test/**.js",
      ],
      env: {
          mocha: true,
          browser: true,
          commonjs: true,
          es6: true,
      },
      extends: [
        'standard',
      ],
      plugins: [
        'babel',
        'mocha',
      ],
      rules: globalRules,
      globals: {
        it: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
      }
    },
  ]
};