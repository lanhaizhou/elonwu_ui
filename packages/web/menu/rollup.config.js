import pkg from './package.json';
import { override } from '../../../rollup.config';

const config = override(pkg, ({ jsConfig }) => jsConfig);
export default config;
