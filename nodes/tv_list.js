module.exports = function(RED) {
  const dashboard = require('../backend')(RED)

  function ListNode(config) {
    RED.nodes.createNode(this,config);
    let node = this;
    let widget = dashboard.create(node, config)
    
    node.on('input', function(msg, done) {
      let { payload } = msg
      let items = payload || []

      widget.setState({ items })

      this.status({
        fill: "green",
        shape: "dot",
        text: `Items: ${items.length}`
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

  RED.nodes.registerType("tv_list", ListNode);
}
