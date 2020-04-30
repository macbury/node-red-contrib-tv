class Screen {
  constructor() {
    this.id = ''
    this.name = ''
    this.columns = 8
    this.widgetWidth = 1
    this.widgetHeight = 1
    this.layout = []
    this.context = null
  }

  updateFromNodeConfig(context, config) {
    this.context = context
    this.id = config.id
    this.name = config.name
    this.columns = config.columns
    this.widgetWidth = config.widgetWidth
    this.widgetHeight = config.widgetHeight
    this.layout = this.context.get('layout') || []
  }

  updateLayout(layout) {
    this.layout = layout
    this.context.set('layout', this.layout)
  }

  toFullState() {
    return {
      id: this.id,
      name: this.name,
      columns: parseInt(this.columns),
      widgetWidth: parseInt(this.widgetWidth),
      widgetHeight: parseInt(this.widgetHeight),
      layout: this.layout
    }
  }
}

module.exports = Screen