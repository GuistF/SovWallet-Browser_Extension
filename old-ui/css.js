const fs = require('fs')
const path = require('path')

module.exports = bundleCss

var cssFiles = {
  'fonts.css': fs.readFileSync(path.join(__dirname, '/app/css/fonts.css'), 'utf8'),
  'reset.css': fs.readFileSync(path.join(__dirname, '/app/css/reset.css'), 'utf8'),
  'lib.css': fs.readFileSync(path.join(__dirname, '/app/css/lib.css'), 'utf8'),
  'search-token.css': fs.readFileSync(path.join(__dirname, '/app/css/search-token.css'), 'utf8'),
  'hw.css': fs.readFileSync(path.join(__dirname, '/app/css/hw.css'), 'utf8'),
  'send-contract.css': fs.readFileSync(path.join(__dirname, '/app/css/send-contract.css'), 'utf8'),
  'confirm-add-token.css': fs.readFileSync(path.join(__dirname, '/app/css/confirm-add-token.css'), 'utf8'),
  'page-container.css': fs.readFileSync(path.join(__dirname, '/app/css/page-container.css'), 'utf8'),
  'index.css': fs.readFileSync(path.join(__dirname, '/app/css/index.css'), 'utf8'),
  'transitions.css': fs.readFileSync(path.join(__dirname, '/app/css/transitions.css'), 'utf8'),
  'first-time.css': fs.readFileSync(path.join(__dirname, '../mascara/src/app/first-time/index.css'), 'utf8'),
  'react-tooltip-component.css': fs.readFileSync(path.join(__dirname, '..', 'node_modules', 'react-tooltip-component', 'dist', 'react-tooltip-component.css'), 'utf8'),
  'react-css': fs.readFileSync(path.join(__dirname, '..', 'node_modules', 'react-select', 'dist', 'react-select.css'), 'utf8'),
  'dropdowns.css': fs.readFileSync(path.join(__dirname, '/app/css/dropdowns.css'), 'utf8'),
}

function bundleCss () {
  var cssBundle = Object.keys(cssFiles).reduce(function (bundle, fileName) {
    var fileContent = cssFiles[fileName]
    var output = String()

    output += '/*========== ' + fileName + ' ==========*/\n\n'
    output += fileContent
    output += '\n\n'

    return bundle + output
  }, String())

  return cssBundle
}
