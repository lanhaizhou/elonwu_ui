const config = require('../../tailwind.config');

module.exports = Object.assign({}, config, {
  plugins: [require('@tailwindcss/line-clamp')],
});
