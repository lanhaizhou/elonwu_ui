let config = require('../../../tailwind.config');
config.theme.extend.gridTemplateColumns = {
  'auto-1fr': 'auto 1fr',
};

module.exports = config;
