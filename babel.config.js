module.exports = {
  presets: [
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
    '@babel/react',
    ['@babel/env', { loose: true }]
  ],
  plugins: [
    '@babel/transform-object-assign',
    ['@babel/proposal-class-properties', { loose: true }],
    // used for stripping out the `invariant` messages in production builds
    'dev-expression',
  ],
  comments: false,
};
