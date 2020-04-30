module.exports = function(RED) {
  const dashboard = require('../backend')(RED)

  function CommentsNode(config) {
    RED.nodes.createNode(this,config);
    let node = this;
    let widget = dashboard.create(node, config)

    node.on('input', function(msg, done) {
      let { payload } = msg
      let comments = payload || []

      widget.setState({ comments })

      this.status({
        fill: "green",
        shape: "dot",
        text: `Comments: ${comments.length}`
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

  RED.nodes.registerType("tv_comments", CommentsNode);
}
