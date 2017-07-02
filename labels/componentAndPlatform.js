var noEntityComponent = ['zwave', 'http', 'recorder', 'mqtt'];

module.exports = function (payload, githubApi, files) {
  var fileNames = files.filter(function(file){
    return (file.filename.indexOf('homeassistant/components/') > -1 &&
            file.filename.indexOf('homeassistant/components/frontend') === -1 &&
            file.filename.indexOf('services.yaml') === -1);
  }).map(function(file){
    var parts = file.filename.replace('homeassistant/components/', '').split('/');
    var type;

    if (parts.length == 1) {
      type = 'component';
      label = parts[0];
    } else if (parts.length == 2 && noEntityComponent.indexOf(parts[0]) > -1) {
      type = 'component';
      label = parts[0];
    } else if (parts.length == 2 && parts[1] == '__init__.py') {
      type = 'component';
      label = parts[0];
    } else {
      type = 'platform';
      label = parts[0] + '.' + parts[1];
    }

    label = label.replace('.py', '')
    return type + ': ' + label;
  });
  return fileNames;
};
