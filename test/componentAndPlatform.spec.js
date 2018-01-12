var assert = require('assert');

var comp = require('../labels/componentAndPlatform');

function getOutput (file) {
  var output = comp(null, null, [
    {filename: 'homeassistant/components/' + file}
  ]);
  return output.length ? output[0] : null
}

describe('componentAndPlatform', () => {
  it('single component file', () => {
    assert.deepEqual(getOutput('browser.py'), 'component: browser');
  });

  it('component dir init', () => {
    assert.deepEqual(getOutput('zwave/__init__.py'), 'component: zwave');
  });

  it('component dir file', () => {
    assert.deepEqual(getOutput('zwave/const.py'), 'component: zwave');
  });

  it('platform file', () => {
    assert.deepEqual(getOutput('light/hue.py'), 'platform: light.hue');
  });

  it('platform dir', () => {
    assert.deepEqual(getOutput('light/lifx/const.py'), 'platform: light.lifx');
  });

  it('component services', () => {
    assert.deepEqual(getOutput('light/services.yaml'), null);
  });

  it('generic services', () => {
    assert.deepEqual(getOutput('services.yaml'), null);
  });

  it('component init file', () => {
    assert.deepEqual(getOutput('cover/__init__.py'), 'component: cover');
  })
});
