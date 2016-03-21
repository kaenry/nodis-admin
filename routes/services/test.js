module.exports = {
  init: function (app) {
    app.get('/text/status', this.getStatus);
  },

  getStatus: function(req, res) {
    res.send({
      status: 'OK.',
      info: process.env
    })
  }
}
