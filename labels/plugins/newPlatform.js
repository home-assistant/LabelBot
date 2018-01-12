module.exports = function (payload, githubApi, files, parsed) {
  var addsNewPlatform = false;
  var fileNames = files.filter(function(file){
    return file.filename.indexOf('homeassistant/components/') > -1;
  }).forEach(function(file){
    if(file.status == 'added') {
      addsNewPlatform = (file.filename.indexOf('.py') > -1);
    }
  });
  if(addsNewPlatform) {
    return ['new-platform'];
  } else {
    return [];
  }
};
