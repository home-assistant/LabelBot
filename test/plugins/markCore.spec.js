var assert = require('assert');

var markCore = require('../../labels/plugins/markCore');
var parsePath = require('../../labels/util/parse_path');

function getOutput (file) {
  const filename = 'homeassistant/components/' + file;
  var output = markCore(null, null, [{filename}], [parsePath(filename)]);
  return output.length ? output[0] : null
}

describe('markCore', () => {
  it('core component init', () => {
    assert.deepEqual(getOutput('http/__init__.py'), 'core');
  });

  it('core component file', () => {
    assert.deepEqual(getOutput('http/auth.py'), 'core');
  });

  it('core component plaftform file', () => {
    assert.deepEqual(getOutput('mqtt/fan.py'), 'core');
  });

  it('non-core component init', () => {
    assert.deepEqual(getOutput('hue/__init__.py'), null);
  });

  it('non-core component file', () => {
    assert.deepEqual(getOutput('hue/config.py'), null);
  });

  it('non-core component platform file', () => {
    assert.deepEqual(getOutput('hue/light.py'), null);
  });

  it('entity component', () => {
    assert.deepEqual(getOutput('light/__init__.py'), 'core');
  });

  it('coer entity component', () => {
    assert.deepEqual(getOutput('automation/__init__.py'), 'core');
  });

  it('core entity component platform file', () => {
    // all platform under automation consider as core
    assert.deepEqual(getOutput('automation/event.py'), 'core');
  });

});
