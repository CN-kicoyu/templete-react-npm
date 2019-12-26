module.exports = {
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      // 修饰器
      experimentalDecorators: true,
      jsx: true
    }
  },
  plugins: ['react-hooks'],
  globals: {
    React: false,
    ReactDOM: false
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    react: {
      version: 'latest'
    }
  },
  rules: {
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-wrap-multilines': [
      'error',
      {
        prop: 'ignore'
      }
    ],
    'import/no-unresolved': 'off',
    'react/state-in-constructor': 'off',
    'no-cond-assign': ['error', 'always'],
    'no-console': 'off'
  }
}
