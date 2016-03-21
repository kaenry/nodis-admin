exports.add = function(req, res, next) {
  res.render('clients/add', {title: '添加实例'});
};
exports.testConnect = function(req, res, next) {
  var redis = require('redis');
  var client = redis.createClient();

  client.on('ready', function(){
    console.log('ready')
  })
  res.send(client.server_info.redis_version);
};
