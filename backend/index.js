var dashboard = null

module.exports = function(RED) {
  if (!dashboard) {
    const Dashboard = require('./dashboard')
    dashboard = new Dashboard(RED.server, RED.httpNode || RED.httpAdmin, RED.log, RED.settings)
  }
  return dashboard
};
