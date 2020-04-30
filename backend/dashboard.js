const path = require('path')
const Bundler = require('parcel-bundler')
const Widget = require('./widget')
const Screen = require('./screen')
const socketio = require('socket.io');

//from: https://stackoverflow.com/a/28592528/3016654
function join() {
  var trimRegex = new RegExp('^\\/|\\/$','g');
  var paths = Array.prototype.slice.call(arguments);
  return '/'+paths.map(function(e) {
      if (e) { return e.replace(trimRegex,""); }
  }).filter(function(e) {return e;}).join('/');
}

/**
 * Initialize frontend for dashboard
 * - start parcel
 * - serve it under /tv path
 */
class Dashboard {
  constructor(server, app, log, redSettings) {
    log.info("[Dashboard] Started");

    this.dirtyWidgets = false
    this.server = server
    this.app = app
    this.log = log
    this.redSettings = redSettings
    this.widgets = {}
    this.screens = {}

    this.setupHttp()
    this.setupSockets()
  }

  setupSockets() {
    const fullPath = join(this.redSettings.httpNodeRoot, '/tv')
    const socketIoPath = join(fullPath, 'data')
    this.io = socketio(this.server, {
      path: socketIoPath
    })

    this.io.on('connection', (client) => {
      this.log.info("[Dashboard] new connection");
      // push screen names
      this.updateFrontendScreens()

      client.on('screens:fetch', (screenName) => {
        this.log.info("[Dashboard] Request for fetch screen")
        this.updateFrontendScreens()
      })
      client.on('screens:update-layout', ({ screenId, layout }) => {
        if (this.screens[screenId]) {
          this.log.info("[Dashboard] Updated layout for screen " + screenId);
          this.screens[screenId].updateLayout(layout)
          this.updateFrontendScreens()
        } else {
          this.log.info("[Dashboard] Could not update layout for screen with id " + screenId);
        }
      })
    })
  }

  setupHttp() {
    const entry = path.resolve('src/index.html')
    const bundle = new Bundler(entry, {
      publicUrl: '/tv'
    })
    this.app.use(bundle.middleware())
  }

  registerOrUpdateScreen(id, context, config) {
    if (!this.screens[id]) {
      this.screens[id] = new Screen()
      this.log.info("[Dashboard] Registering new screen with id " + id);
    } else {
      this.log.info("[Dashboard] Updating existing screen with id " + id);
    }
    this.screens[id].updateFromNodeConfig(context, config)
    this.updateFrontendScreens()
  }

  removeScreen(screenNodeId) {
    this.log.info("[Dashboard] Removing screen with id " + screenNodeId);
    delete this.screens[screenNodeId]
    this.updateFrontendScreens()
  }

  sync(widget) {
    const topic = ['widgets', widget.screen, 'update'].join(':')
    this.io.emit(topic, widget.toFullState())
  }

  updateFrontendScreens() {
    const screens = Object.values(this.screens)
    const screenMap = screens.map(({ name, id }) => ({ name, id }))
    this.io.emit('screens:init', screenMap)
    screens.forEach((screen) => {
      this.io.emit(['screens', screen.id, 'update'].join(':'), screen.toFullState())
    })
    this.updateFrontendWidgets()
  }

  updateFrontendWidgets() {
    const widgetsByScreen = Object.values(this.widgets).reduce((map, widget) => {
      map[widget.screen] = map[widget.screen] || []
      map[widget.screen].push(widget.toFullState())
      return map
    }, {})

    Object.keys(widgetsByScreen).forEach((screenNodeId) => {
      const widgets = widgetsByScreen[screenNodeId]
      const topic = ['widgets', screenNodeId, 'init'].join(':')
      this.log.info('Pushing widgets '+ widgets.length +' to ' + topic)
      this.io.emit(topic, widgets)
    })
  }

  create(node, config) {
    if (this.widgets[node.id]) {
      this.log.info('Widget exists for node '+ node.id)
    } else {
      this.log.info('Creating new widget for node '+ node.id)
    }

    const widget = this.widgets[node.id] || new Widget()
    widget.update(node, config)
    this.widgets[node.id] = widget
    this.updateFrontendWidgets()
    return widget
  }

  updateOrDestroy(node, widget, removed) {
    if (removed) {
      this.destroy(widget)
    } else {
      widget.update(node)
    }
  }

  destroy(widget) {
    const nodeId = widget.node.id
    if (this.widgets[nodeId]) {
      this.log.info('Removing existing widget for node '+ nodeId)
      delete this.widgets[nodeId]
    } else {
      this.log.error('Could not find widget for node '+ nodeId)
    }
    this.updateFrontendWidgets()
  }
}

module.exports = Dashboard