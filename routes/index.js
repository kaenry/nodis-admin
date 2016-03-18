exports.clients = require('./clients')

exports.index = function(req, res, next) {
  res.render('index', {title: 'Nodis Admin'})
}
