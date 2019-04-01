var assert = require("assert");

var hasTests = require("../../labels/plugins/hasTests");
var parsePath = require("../../labels/util/parse_path");

function getOutput(filename) {
  var output = hasTests(null, null, [parsePath({ filename })]);
  return output.length ? output[0] : null;
}

describe("hasTests", () => {
  it("marks PRs with tests", () => {
    assert.deepEqual(getOutput("tests/components/light/hue.py"), "has-tests");
  });
  it("not mark PRs without tests", () => {
    assert.deepEqual(getOutput("homeassistant/components/light/hue.py"), null);
  });
});
