const { entityComponent, coreComponents } = require("../const");

module.exports = function(file) {
  const parts = file.filename.split("/");

  const rootFolder = parts.shift();

  const result = {
    additions: file.additions,
    status: file.status,
    path: file.filename,
    filename: parts[parts.length - 1],
    core: false,
    type: null,
    component: null,
    platform: null
  };

  if (!["tests", "homeassistant"].includes(rootFolder)) {
    return null;
  }

  const subfolder = parts.shift();

  if (subfolder !== "components") {
    result.core = true;

    if (subfolder.endsWith(".py")) {
      result.type = "core";
    } else {
      result.type = subfolder;
    }
    return result;
  }

  // This is not possible anymore after great migration
  if (parts.length < 2) {
    return result;
  }

  result.component = parts.shift();
  let filename = parts[0].replace(".py", "");

  if (rootFolder === "tests") {
    result.type = "test";
    filename = filename.replace("test_", "");
    if (entityComponent.includes(filename)) {
      result.platform = filename;
    }
  } else if (filename === "services.yaml") {
    result.type = "services";
  } else if (entityComponent.includes(filename)) {
    result.type = "platform";
    result.platform = filename;
  } else {
    result.type = "component";
  }

  result.core = coreComponents.includes(result.component);

  return result;
};
