const { entityComponent, coreComponents } = require('../const');

module.exports = function(path) {
  const parts = path.split('/');

  // filter out all but the src
  if (parts.shift() !== 'homeassistant') return null;

  const result = {
    path,
    filename: parts[parts.length - 1],
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

  // This is not possible anymore after great migration
  if (parts.length < 2) {
    return result;
  }

  result.component = parts.shift();
  filename = parts[0].replace('.py', '')
  if (filename === 'services.yaml') {
    result.type = 'services';
  } else if (entityComponent.includes(filename)) {
    result.type = 'platform';
    result.platform = filename;
  } else {
    result.type = 'component';
  }

  result.core = coreComponents.includes(result.component);

  return result;
}
