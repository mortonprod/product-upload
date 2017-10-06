module.exports = {
  parser: false,
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {},
    'cssnano': {discardComments: { removeAll:true }}
  }
}