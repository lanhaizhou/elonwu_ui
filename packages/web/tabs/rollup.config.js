import svg from 'rollup-plugin-svg';
import pkg from './package.json';
import { override } from '../../../rollup.config';

const config = override(pkg, ({ tsConfig, dtsConfig }) => [
  Object.assign({}, tsConfig, { plugins: [svg(), ...tsConfig.plugins] }),
  dtsConfig,
]);
export default config;
