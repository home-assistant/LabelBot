const { entityComponent, coreComponents } = require('../const');

module.exports = function(path) {
  const parts = path.split('/');

  // filter out all but the src
  if (parts.shift() !== 'homeassistant') return null;

  const result = {
    path,
    core: false,
    type: null,
    component: null,
    platform: null,
  };

  const subfolder = parts.shift();

  if (subfolder !== 'components') {
    result.core = true;

    if (subfolder.endsWith('.py')) {
      result.type = 'core';
    } else {
      result.type = subfolder;
    }
    return result;
  }

  if (parts.length == 1) {
    if (parts[0] === 'services.yaml') {
      result.type = 'services';
    } else if (parts[0] === '__init__.py') {
      result.core = true;
      result.type = 'core'
    } else {
      result.type = 'component';
      result.component = parts[0].replace('.py', '');
    }
    return result;
  }

  result.component = parts.shift();
  result.type = parts[0] === 'services.yaml' ? 'services' : 'component';

  if (coreComponents.includes(result.component)) {
    if (result.type !== 'platform' && result.type !== 'services'
        || !entityComponent.includes(result.component)) {
      result.core = true;
    }
  }
  return result;
}
