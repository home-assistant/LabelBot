var test = require('tape');

var comp = require('../labels/componentAndPlatform');

function getOutput (file) {
  var output = comp(null, null, [
    {filename: 'homeassistant/components/' + file}
  ]);
  return output.length ? output[0] : null
}

test('single component file', (t) => {
  t.deepEqual(getOutput('browser.py'), 'component: browser');
  t.end();
});

test('component dir init', (t) => {
  t.deepEqual(getOutput('zwave/__init__.py'), 'component: zwave');
  t.end();
});

test('component dir file', (t) => {
  t.deepEqual(getOutput('zwave/const.py'), 'component: zwave');
  t.end();
});

test('platform file', (t) => {
  t.deepEqual(getOutput('light/hue.py'), 'platform: light.hue');
  t.end();
});

test('platform dir', (t) => {
  t.deepEqual(getOutput('light/lifx/const.py'), 'platform: light.lifx');
  t.end();
});

test('component services', (t) => {
  t.deepEqual(getOutput('light/services.yaml'), null);
  t.end();
});

test('generic services', (t) => {
  t.deepEqual(getOutput('services.yaml'), null);
  t.end();
});
