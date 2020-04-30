import React from 'react'
import WidgetRepository from '../widgets'
import GridLayout from 'react-grid-layout'
import useWidgets from '../hooks/useWidgets'
import { IScreen } from '../hooks/useSocket'

interface IGridProps {
  screen: IScreen
}

export default function Grid({ screen } : IGridProps) {
  const [widgets, onUpdateLayout] = useWidgets(screen.id)

  const items = widgets.map((widget) => {
    const Widget = WidgetRepository.find(widget.node.type)

    return (
      <div key={widget.node.id} className="grid-item">
        <Widget widget={widget} />
      </div>
    )
  })

  const containerSize = screen.columns * screen.widgetWidth

  return (
    <div style={{ width: containerSize, margin: '0 auto' }}>
      <GridLayout
        layout={items.length > 0 ? screen.layout : []}
        onLayoutChange={onUpdateLayout}
        className="layout"
        cols={screen.columns}
        rowHeight={screen.widgetHeight}
        compactType="horizontal"
        isDraggable
        useCSSTransforms
        width={containerSize}>
        {items}
      </GridLayout>
    </div>

  )
}