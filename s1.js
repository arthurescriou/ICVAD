const fetch = require('node-fetch')
const express = require('express')
const app = express()
const port = 5372
const server0 = 'http://172.17.0.1:4567'

const fetchBack = () => {
  fetch(server0)
    .then(res => res.text())
    .then(console.log)
}

app.get('/', (req, res) => {
  setTimeout(fetchBack, 500)
  res.send('pong')
})

app.listen(port, () => {
  console.log(`Example app listening at http://:${port}`)
})
