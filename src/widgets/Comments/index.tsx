import React, { useMemo, useEffect, useState, useCallback } from 'react'
import { IWidgetProps } from '../Repository'
import "./comments.scss"

interface IComment {
  title: string
  body: string
}

interface ICommentsConfig {
  name: string,
  icon: string,
  color: string,
  nextIn: number
}

export default function CommentsWidget({ widget: { node, state: { comments } } } : IWidgetProps) {
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0)
  const [effectClassName, setEffect] = useState('')
  const lastUpdate = useMemo(() => new Date(), [comments])
  const {
    icon,
    color: backgroundColor,
    name,
    nextIn
  } : ICommentsConfig = node?.config || {}

  useEffect(() => {
    const interval = (nextIn || 8) * 1000
    const handler = setInterval(() => {
      setEffect('fadeOut')
      setTimeout(() => {
        setCurrentCommentIndex(prevIndex => (prevIndex + 1) % comments.length)
        setEffect('fadeIn')
      }, 600)

    }, interval)
    return () => clearTimeout(handler)
  }, [nextIn, comments])

  const currentComment = comments ? comments[currentCommentIndex] : null

  return (
    <div className="widget widget-comments" style={{ backgroundColor }}>
      <h1 className="title">{name}</h1>

      <div className={`comment-container ${effectClassName}`}>
        <h3><span className="name">{currentComment?.title}</span></h3>
        <p className="comment">{currentComment?.body}</p>
      </div>

      <p className="updated-at">{lastUpdate.toLocaleTimeString()}</p>
      {icon && <i className={`fa ${icon} icon-background`}></i>}
    </div>
  )
}