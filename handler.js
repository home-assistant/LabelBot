'use strict';

var crypto = require('crypto')
  , bufferEq = require('buffer-equal-constant-time')
  , GitHubApi = require('github')
  , parsePath = require('./labels/util/parse_path')
  , processFiles = require('./labels/process')
  , github = new GitHubApi();

github.authenticate({ type: 'oauth', token: process.env.GITHUB_TOKEN });

module.exports.receiveWebhook = (event, context, callback) => {
  var body = JSON.parse(event['body']);
  var eventType = event.headers['X-GitHub-Event'];
  var eventGUID = event.headers['X-GitHub-Delivery'];
  var signature = event.headers['X-Hub-Signature'];
  if(eventType != 'pull_request' || body.action != 'opened') {
    callback(null, buildResponse({'status': 'skipped', 'labels': []}));
    return
  }
  console.log('Received event', JSON.stringify(event), JSON.stringify(body));
  if(!verifySignature(process.env.GITHUB_SECRET, JSON.stringify(body), signature)) {
    callback(new Error('[403] Expected signature did not match'), {'status': 'unexpected_signature'});
    return
  }
  console.log('Received event of type', eventType);
  github.pullRequests.getFiles({
    owner: body.repository.owner.login,
    repo: body.repository.name,
    number: body.number
  }, function(err, files){
    if(err) {
      callback(new Error(err));
      return
    }

    const labels = processFiles(body, github, files);

    console.log('Adding labels', labels);
    if (labels.length > 0 && labels.length < 10) {
      github.issues.addLabels({
        owner: body.repository.owner.login,
        repo: body.repository.name,
        number: body.number,
        labels: labels
      }, function(err, resp){
        callback(err, buildResponse({'status': 'ok', 'labels': labels}));
        return
      });
    } else {
      callback(null, buildResponse({'status': 'skipped', 'labels': labels}));
      return
    }
  });
};

function signData(secret, data) {
  return 'sha1=' + crypto.createHmac('sha1', secret).update(data, 'utf-8').digest('hex');
}

function verifySignature(secret, data, signature) {
  return bufferEq(new Buffer(signature), new Buffer(signData(secret, data)));
}

function buildResponse(json){
  return {
    statusCode: (json.status === 'ok') ? 201 : 200,
    headers: {},
    body: JSON.stringify(json)
  };
}
