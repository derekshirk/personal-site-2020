const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

// the file name as an entry point for postcss compilation
// also used to define the output filename in our output /css folder.
const inputFileName = "index.css";
const outputFileName = "style.css";

module.exports = class {
  async data () {
    const rawFilepath = path.join(__dirname, `_includes/assets/css/${inputFileName}`);
    return {
      permalink: `/css/${outputFileName}`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath)
    };
  };

  async render ({ rawCss, rawFilepath }) {
    return await postcss([
      require('postcss-import'),
      require('postcss-for'),
      require('postcss-mixins'),
      require('precss'),
      require('autoprefixer'),
      require('postcss-modular-scale-unit'),
      require('postcss-color-mix'),
      require('cssnano')
    ])
    .process(rawCss, { from: rawFilepath })
    .then(result => result.css);
  };
}
