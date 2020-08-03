const htmlmin = require('html-minifier')
const beautify = require('js-beautify').html

module.exports = function(config, options) {
  config.addTransform('format', function(content, outputPath) {
    if (outputPath.endsWith('.html')) {
      if (options.env === 'production') {
        // Minify HTML in production
        // Options: https://github.com/kangax/html-minifier
        return htmlmin.minify(content, {
          collapseBooleanAttributes: true,
          collapseInlineTagWhitespace: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          useShortDoctype: true
        })
      } else {
        // Beautify HTML in development
        // Options: https://github.com/beautify-web/js-beautify
        return beautify(content, {
          extra_liners: [],
          indent_inner_html: true,
          indent_size: 2,
          max_preserve_newlines: 1
        })
      }
    }

    return content
  })

  // Add transforms
}
