import React, { FunctionComponent } from 'react'
import { IWidget } from '../hooks/useSocket'

export interface IWidgetProps {
  widget: IWidget
}

export type WidgetComponent = FunctionComponent<IWidgetProps>

export default class WidgetRepository {
  private widgets: {
    [nodeRedType: string]: WidgetComponent
  } = {}

  public register(nodeRedType : string, component : WidgetComponent) {
    if (this.widgets[nodeRedType]) {
      throw `There is already registered component with type: ${nodeRedType}`
    }

    this.widgets[nodeRedType] = component
  }

  public find(nodeRedType : string) {
    if (!this.widgets[nodeRedType]) {
      throw `Could not find component for: ${nodeRedType}`
    }

    return this.widgets[nodeRedType]
  }
}