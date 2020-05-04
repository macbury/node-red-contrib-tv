module.exports = function(RED) {
  const dashboard = require('../backend')(RED)

  function NumberNode(config) {
    RED.nodes.createNode(this,config);
    let node = this;
    let widget = dashboard.create(node, config)

    node.on('input', function(msg, done) {
      let { payload, last, history } = msg
      let current = payload || 0

      widget.setState({
        current,
        last: last || 0,
        history
      })

      this.status({
        fill: "green",
        shape: "dot",
        text: `Value: ${current}`
      })

      dashboard.sync(widget)

      if (done) {
        done()
      }
    })

    node.on('close', function(removed, done) {
      dashboard.updateOrDestroy(node, widget, removed)

      if (done) {
        done()
      }
    })
  }

  RED.nodes.registerType("tv_number", NumberNode);
}
