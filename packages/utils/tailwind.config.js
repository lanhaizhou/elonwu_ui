const config = require('../../tailwind.config');

module.exports = Object.assign({}, config, {
  plugins: (config?.plugins || []).concat([require('@tailwindcss/line-clamp')]),
});
