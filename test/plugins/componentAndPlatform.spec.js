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
    assert.deepEqual(getOutput('browser.py'), 'component: browser');
  });

  it('component dir init', () => {
    assert.deepEqual(getOutput('zwave/__init__.py'), 'component: zwave');
  });

  it('component dir file', () => {
    assert.deepEqual(getOutput('zwave/const.py'), 'component: zwave');
  });

  it('component dir plaform file', () => {
    assert.deepEqual(getOutput('zwave/light.py'), 'component: zwave');
  });

  it('platform file', () => {
    assert.deepEqual(getOutput('hue/light.py'), 'component: hue');
  });

  it('platform dir', () => {
    assert.deepEqual(getOutput('lifx/light/const.py'), 'component: lifx');
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
