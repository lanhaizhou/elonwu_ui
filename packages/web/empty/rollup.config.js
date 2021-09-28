import svg from 'rollup-plugin-svg';

import pkg from './package.json';
import { override } from '../../../rollup.config';

const config = override(pkg, ({ jsConfig }) =>
  Object.assign({}, jsConfig, {
    plugins: jsConfig.plugins.concat([svg({ base64: true })]),
  }),
);

export default config;
