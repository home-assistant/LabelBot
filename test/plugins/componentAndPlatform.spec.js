var assert = require('assert');

var comp = require('../../labels/plugins/componentAndPlatform');
var parsePath = require('../../labels/util/parse_path');

function getOutput (file) {
  const filename = 'homeassistant/components/' + file;
  var output = comp(null, null, [{filename}], [parsePath(filename)]);
  return output.length ? output[0] : null
}

describe('componentAndPlatform', () => {
  it('single component file', () => {
    assert.deepEqual(getOutput('browser/__init__.py'), 'integration: browser');
  });

  it('component dir init', () => {
    assert.deepEqual(getOutput('zwave/__init__.py'), 'integration: zwave');
  });

  it('component dir file', () => {
    assert.deepEqual(getOutput('zwave/const.py'), 'integration: zwave');
  });

  it('component dir plaform file', () => {
    assert.deepEqual(getOutput('zwave/light.py'), 'integration: zwave');
  });

  it('platform file', () => {
    assert.deepEqual(getOutput('hue/light.py'), 'integration: hue');
  });

  it('platform dir', () => {
    assert.deepEqual(getOutput('lifx/light/const.py'), 'integration: lifx');
  });

  it('component services', () => {
    assert.deepEqual(getOutput('light/services.yaml'), null);
  });

  it('generic services', () => {
    assert.deepEqual(getOutput('services.yaml'), null);
  });

  it('component init file', () => {
    assert.deepEqual(getOutput('cover/__init__.py'), 'integration: cover');
  })
});
