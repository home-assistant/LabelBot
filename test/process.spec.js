var assert = require("assert");

var process = require("../labels/process");

describe("process", () => {
  it("should work", () => {
    filenames = [
      "homeassistant/components/hue/light.py",
      "homeassistant/components/mqtt/server.py",
      "homeassistant/const.py",
      "tests/components/cloud/test_iot.py"
    ];

    files = filenames.map(filename => ({
      filename,
      status: "added",
      additions: 200
    }));

    const result = process(
      {
        pull_request: {
          base: {
            ref: "master"
          }
        }
      },
      null,
      files
    );
    result.sort();
    assert.deepEqual(result, [
      "core",
      "has-tests",
      "integration: hue",
      "integration: mqtt",
      "merging-to-master",
      "new-platform"
    ]);
  });
});
