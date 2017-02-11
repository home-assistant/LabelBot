module.exports = function (payload, githubApi, files) {
  var removesPlatform = false;
  var fileNames = files.filter(function(file){
    return file.filename.indexOf('homeassistant/components/') > -1;
  }).forEach(function(file){
    if(file.status == 'removed') {
      removesPlatform = (file.filename.indexOf('.py') > -1);
    }
  });
  if(removesPlatform) {
    return ['remove-platform'];
  } else {
    return [];
  }
};
