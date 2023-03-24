module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/prop-types': 0,
    'no-plusplus': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
        packageDir: __dirname,
      },
    ],
    'require-jsdoc': 0,
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
    'react/no-unknown-property': 0,
  },
};
