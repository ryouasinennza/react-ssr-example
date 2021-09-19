import path from 'path'
import fs from 'fs'
import root from 'app-root-path'

import React from 'react'
import express from 'express'
import ReactDOMServer from 'react-dom/server'

import App from '../src/App'

const PORT = process.env.PORT || 3000
const app = express()
app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App value="サーバー" />)

  // console.log("app", app);
  const indexFile = path.resolve('./build/index.html')
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err)
      return res.status(500).send('Oops, better luck next time!')
    }

    const html = data.replace(
      '<div id="root" data-props=""></div>',
      `<div id="root" data-props='${JSON.stringify({
        value: 'クライアント'
      })}'>${app}</div>`
    )
    return res.send(html)
  })
})

app.use(express.static(`${root}/build`))

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`)
})
