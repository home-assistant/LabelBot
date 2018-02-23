// Components that have multiple files that are not integrations
var noEntityComponent = [
  'alexa',
  'cloud',
  'config',
  'google_assistant',
  'hassio',
  'http',
  'mqtt',
  'recorder',
  'zwave',
  'scene',
  'zha',
];

var coreComponents = [
  'alarm_control_panel',
  'alexa',
  'api',
  'automation',
  'binary_sensor',
  'camera',
  'climate',
  'cloud',
  'configurator',
  'conversation',
  'counter',
  'cover',
  'device_tracker',
  'fan',
  'frontend',
  'google_assistant',
  'group',
  'hassio',
  'history',
  'http',
  'input_boolean',
  'input_datetime',
  'input_number',
  'input_select',
  'input_text',
  'introduction',
  'light',
  'lock',
  'logger',
  'map',
  'media_player',
  'mqtt',
  'notify',
  'panel_custom',
  'panel_iframe',
  'persistent_notification',
  'recorder',
  'scene',
  'script',
  'sensor',
  'shell_command',
  'shopping_list',
  'sun',
  'switch',
  'timer',
  'updater',
  'vacuum',
  'weather',
  'weblink',
  'websocket_api',
  'zone',
];

var coreComponentPlatforms = [
  'automation',
];

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

  if (parts[0] === 'services.yaml') {
    result.type = 'services'
  } else if (parts[0] == '__init__.py' ||
      noEntityComponent.includes(result.component)) {
    result.type = 'component';
  } else {
    result.type = 'platform';
    result.platform = parts[0].replace('.py', '');
  }

  if (result.type === 'component' &&
      coreComponents.includes(result.component)) {
    result.core = true;
  } else if (result.type === 'platform' &&
      coreComponentPlatforms.includes(result.component)) {
    result.core = true;
  }
  return result;
}
