import React, { useMemo } from 'react'
import "./number.scss"
import { IWidgetProps } from '../Repository'

interface INumberConfig {
  name: string,
  icon: string,
  color: string,
  moreInfo: string,
  stufix: string
}

function getValueChange(diff) {
  if (diff === 0) {
    return ''
  } else if (diff > 0) {
    return 'fa fa-arrow-up'
  } else if (diff < 0) {
    return 'fa fa-arrow-down'
  }
}

function formatFixed(value : number) {
  if (value > 1000) {
    const numK = Math.round(value / 1000)
    return `${numK}K`
  }
  const formatted = value.toFixed(2)
  if (formatted.split('.')[1] === '00') {
    return value
  } else {
    return formatted
  }
}

export default function NumberWidget({ widget } : IWidgetProps) {
  const last = parseFloat(widget.state.last || 0)
  const current = parseFloat(widget.state.current || 0)
  const diff = last !== 0 ? Math.abs(Math.ceil((current - last) / last * 100)) : 0
  const change = getValueChange(diff)
  const lastUpdate = useMemo(() => new Date(), [current])

  const {
    stufix,
    icon,
    moreInfo,
    color: backgroundColor,
    name
  } : INumberConfig = widget?.node?.config || {}

  return (
    <div className="widget widget-number" style={{ backgroundColor }}>
      <h1 className="title">{name}</h1>
      <h2 className="value">{formatFixed(current)} {stufix}</h2>

      <p className="change-rate">
        <i className={change}></i><span>{diff}%</span>
      </p>

      <p className="more-info">{moreInfo}</p>

      <p className="updated-at">{lastUpdate.toLocaleTimeString()}</p>

      {icon && <i className={`${icon} icon-background`}></i>}
    </div>
  )
}