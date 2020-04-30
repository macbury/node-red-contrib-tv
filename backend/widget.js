class Widget {
  constructor() {
    this.state = {}
    this.screen = 'nonde'
    this.node = {
      id: 'missing',
      name: 'missing',
      type: 'missing',
      screen: 'none',
      config: {}
    }
  }

  setState(data) {
    this.state = data
  }

  update(node, config) {
    this.node = {
      id: node.id,
      type: node.type,
      screen: config.screen || 'none',
      config
    }

    this.screen = this.node.screen
  }

  toFullState() {
    return {
      node: this.node,
      state: this.state,
      style: this.style
    }
  }
}

module.exports = Widget