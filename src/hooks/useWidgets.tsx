import { useReducer, useCallback, useState, useLayoutEffect } from 'react'
import { useSocket, useSocketWidgetsInitEvent, useSocketWidgetUpdateEvent, IWidget } from './useSocket'

export type TWidgetsActionType = 'update' | 'clear' | 'set'
export type TWidgetAction = {
  type: TWidgetsActionType,
  payload: any
}

function WidgetReducer(state : Array<IWidget>, action : TWidgetAction) {
  switch(action.type) {
    case 'update':
      return state.map((oldWidget) => {
        if (oldWidget.node.id === action.payload.node.id) {
          return action.payload
        } else {
          return oldWidget
        }
      })
    case 'clear':
      return []
    case 'set':
      return action.payload
    default:
      throw `Implement action: ${action.type}`
  }
}

export default function uswWidgets(screenId : string) {
  const [loaded, setLoaded] = useState(false)
  const io = useSocket()
  const [widgets, dispatch] = useReducer(WidgetReducer, [])

  useSocketWidgetsInitEvent(screenId, (newWidgets) => {
    console.log('update all widgets', newWidgets)
    dispatch({
      type: 'set',
      payload: newWidgets
    })
    setLoaded(true)
  })

  useSocketWidgetUpdateEvent(screenId, (freshWidget) => {
    console.log('Update single widget', freshWidget)
    dispatch({
      type: 'update',
      payload: freshWidget
    })
  })

  const onUpdateLayout = useCallback((newLayout : Array<any>) => {
    io.emit(`screens:update-layout`, { layout: newLayout, screenId })
  }, [io, screenId, widgets])

  useLayoutEffect(() => {
    setLoaded(false)
  }, [screenId])

  return [widgets, onUpdateLayout]
}
