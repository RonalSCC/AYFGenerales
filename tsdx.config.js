const postcss = require('rollup-plugin-postcss');
const images = require('@rollup/plugin-image');
const depsExternal = require('rollup-plugin-peer-deps-external');


// import postcss from 'rollup-plugin-postcss';
// import images from '@rollup/plugin-image';

module.exports = {
 rollup(config, options) {
    config.plugins = [
      postcss({ modules: true }),
      images({ incude: ['**/*.png', '**/*.jpg'] }),
      ...config.plugins,
      depsExternal()
    ];
    return config;
 },
};