// Add to plugins array in rollup.config.js
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
 
export default {
  plugins: [
    // Preferably set as first plugin.
    peerDepsExternal(),
  ],
}