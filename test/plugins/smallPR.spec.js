var assert = require("assert");

var smallPR = require("../../labels/plugins/smallPR");
var parsePath = require("../../labels/util/parse_path");

function getOutput(files) {
  var output = smallPR(null, null, files);
  return output.length ? output[0] : null;
}

describe("smallPR", () => {
  it("marks small PRs", () => {
    assert.deepEqual(
      getOutput([
        {
          additions: 10
        },
        {
          additions: 5
        }
      ]),
      "small-pr"
    );
  });
  it("does not mark big PRs", () => {
    assert.deepEqual(
      getOutput([
        {
          additions: 10
        },
        {
          additions: 25
        }
      ]),
      null
    );
  });
  it("excludes test code from small PRs", () => {
    assert.deepEqual(
      getOutput([
        {
          type: "test",
          additions: 10000
        },
        {
          additions: 5
        }
      ]),
      "small-pr"
    );
  });
});
