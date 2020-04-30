import React, { useMemo } from 'react'
import { IWidgetProps } from '../Repository'
import "./text.scss"

interface ITextConfig {
  name: string,
  icon: string,
  color: string,
  moreInfo: string
}

export default function TextWidget({ widget: { node, state: { text } } } : IWidgetProps) {
  const lastUpdate = useMemo(() => new Date(), [text])
  const {
    icon,
    color: backgroundColor,
    name,
    moreInfo
  } : ITextConfig = node?.config || {}

  return (
    <div className="widget widget-text" style={{ backgroundColor }}>
      <h1 className="title">{name}</h1>

      <h3>{text}</h3>

      <p className="more-info">{moreInfo}</p>

      <p className="updated-at">{lastUpdate.toLocaleTimeString()}</p>

      {icon && <i className={`fa ${icon} icon-background`}></i>}
    </div>
  )
}