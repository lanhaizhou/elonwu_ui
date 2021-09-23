import svg from 'rollup-plugin-svg';
import pkg from './package.json';
import setRollup from '../../rollup.config';

const config = setRollup(pkg, [svg({ base64: true })]);

export default config;
