var path = require('path');
var fs = require('fs');

module.exports = function(app) {
  var FS_SERVICE_PATH = path.join(__dirname, 'services');
  var SERVICE_PATH = './services/';

  fs.readdir(FS_SERVICE_PATH, function (err, files) {
    if (err) {
      throw '没有找到Service文件夹...' + FS_SERVICE_PATH;
    }
    for (var f; files.length && (f = files.shift());) {
      var service = require(SERVICE_PATH + f);
      service.init && service.init(app);
    }

    app.get('/', function(req, res) {
      res.render('index', {title: 'Nodis Admin'})
    });
  })
}
