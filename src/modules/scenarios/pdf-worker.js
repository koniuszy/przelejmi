/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable import/no-extraneous-dependencies */
if (process.env.NODE_ENV === 'production') {
  // use minified verion for production
  module.exports = require('pdfjs-dist/build/pdf.worker.min.js')
} else {
  module.exports = require('pdfjs-dist/build/pdf.worker.js')
}
