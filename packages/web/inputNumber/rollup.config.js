import svg from 'rollup-plugin-svg';
import pkg from './package.json';
import { override } from '../../../rollup.config';

const config = override(pkg, ({ tsConfig, dtsConfig }) => {
  return [
    Object.assign({}, tsConfig, {
      plugins: tsConfig.plugins.concat([svg({ base64: true })]),
    }),
    dtsConfig,
  ];
});

export default config;
