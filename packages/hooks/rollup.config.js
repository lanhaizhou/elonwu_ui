import pkg from './package.json';

import { override } from '../../rollup.config';

const config = override(pkg, ({ tsConfig, dtsConfig }) => [
  tsConfig,
  dtsConfig,
]);

export default config;
