module.exports = function (payload, githubApi, files) {
  var fileNames = files.filter(function(file){
    return (file.filename.indexOf('homeassistant/components/') > -1 && file.filename.indexOf('homeassistant/components/frontend') === -1);
  }).map(function(file){
    var stripHass = file.filename.replace('homeassistant/components/', '');
    var stripExtension = stripHass.replace('.py', '');
    var stripInit = stripExtension.replace('/__init__', '');
    var label = stripInit.replace('/', '.');
    var word = (label.indexOf('.') > -1) ? 'platform' : 'component';
    return word+': '+label;
  });
  return fileNames;
};
