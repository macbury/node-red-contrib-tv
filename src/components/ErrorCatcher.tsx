import React from 'react'

interface IState {
  hasError?: boolean
}

export default class ErrorCatcher extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('error', error)
    setTimeout(() => window.location.reload(), 10 * 1000)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children
  }
}