module.exports = function(RED) {
  const dashboard = require('../backend')(RED)

  function ScreenNode(config) {
    RED.nodes.createNode(this, config)
    const node = this
    const context = node.context();
    dashboard.registerOrUpdateScreen(node.id, context, config)

    node.on('close', function(removed, done) {
      if (removed) {
        dashboard.removeScreen(node.id)
      } else {
        dashboard.registerOrUpdateScreen(node.id, context, config)
      }

      if (done) {
        done()
      }
    })
  }

  RED.nodes.registerType("screen", ScreenNode);
}