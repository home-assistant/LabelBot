var assert = require('assert');

var markCore = require('../../labels/plugins/markCore');
var parsePath = require('../../labels/util/parse_path');

function getOutput (file) {
  const filename = 'homeassistant/components/' + file;
  var output = markCore(null, null, [{filename}], [parsePath(filename)]);
  return output.length ? output[0] : null
}

describe('componentAndPlatform', () => {
  it('single component file', () => {
    assert.deepEqual(getOutput('automation/state.py'), 'core');
  });
});
