
var redis = require('redis');
var fs = require('fs');
var path = require('path');
var uuid = require('node-uuid');

var CLIENTS_PATH = path.join(process.cwd(), 'data', 'clients.json');

module.exports = {
  init: function(app) {
    app.get('/clients/add', this.add);
    app.get('/clients/list', this.list);
    app.post('/clients/create', this.create);
    app.get('/clients/testConnect', this.testConnect);
    app.get('/clients/getClients', this.getClients);
    app.post('/clients/delete', this.del);
  },

  del: function(req, res) {
    var id = req.body.id;
    console.log(id)

    var content = JSON.parse(fs.readFileSync(CLIENTS_PATH));
    for (var i in content) {
      var c = content[i];
      if (c.uuid === id) {
        content.splice(i, 1);

        fs.writeFileSync(CLIENTS_PATH, JSON.stringify(content), 'utf8');

        return res.send({
          res: true,
          msg: '成功'
        })
      }
    }
    return res.send({
      res: false,
      msg: '失败，没有此记录'
    })
  },

  getClients: function(req, res) {
    fs.readFile(CLIENTS_PATH, 'utf8', function(err, data) {
      if (err) {
        fs.writeFileSync(CLIENTS_PATH, JSON.stringify([]), 'utf8');

        res.send([]);
      }

      var clients = JSON.parse(data);
      res.send(clients);
    })
  },

  testConnect: function (req, res) {
    var client = redis.createClient();
    client.on('ready', function(){
      console.log('ready')
    });

    res.send({
      status: 'ready',
      info: client.server_info
    })
  },

  create: function(req, res, next) {

    var host = req.body.host;
    var port = req.body.port;
    if (!host || !port) {
      return res.send({
        status: 'error host or port'
      });
    }

    var content = JSON.parse(fs.readFileSync(CLIENTS_PATH));
    var newClient = {
      host: host,
      port: port,
      uuid: uuid.v4()
    };
    content.push(newClient);
    fs.writeFileSync(CLIENTS_PATH, JSON.stringify(content));
    // post的请求跳转到get，目前有问题，页面会阻塞
    res.redirect('/clients/list');
  },

  add: function(req, res) {
    res.render('clients/add', {title: '添加实例'})
  },

  list: function(req, res) {
    res.render('clients/list', {title: '实例列表'})
  }
}
