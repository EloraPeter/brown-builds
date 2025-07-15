// postcss.config.js
module.exports = {
  plugins: {
    'postcss-nested': {}, // optional but helps with nesting
    'postcss-custom-properties': {}, // auto handles variables
    'autoprefixer': {}, // vendor prefixes
    'cssnano': {} // minifies final output
  }
};
