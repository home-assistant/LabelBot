var assert = require('assert');

var process = require('../labels/process');

describe('process', () => {
  it('should work', () => {

    filenames = [
      'homeassistant/components/light/hue.py',
      'homeassistant/components/services.yaml',
      'homeassistant/components/mqtt/server.py',
      'homeassistant/const.py',
    ];

    files = filenames.map(filename => ({filename}));

    const result = process({
        pull_request: {
          base: {
            ref: 'master'
          }
        }
    }, null, files);
    result.sort();
    assert.deepEqual(result, [
      'component: mqtt',
      'core',
      'merging-to-master',
      'platform: light.hue'
    ]);
  });
});
