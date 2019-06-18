import React from 'react'
import ReactDOM from 'react-dom'
import './bootstrapMuiStyles'
// 要在載入App之前 先載入theme 主題進來,不然會衝突,無法載入
import App from './App'

const rootElement = document.getElementById("root")
ReactDOM.render (
  <App />,
  rootElement
)

