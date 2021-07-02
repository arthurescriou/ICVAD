const fetch = require('node-fetch')
const express = require('express')
const app = express()
const port = 4567
const server1 = 'http://172.17.0.1:5372'

const fetchBack = () => {
  fetch(server1)
    .then(res => res.text())
    .then(console.log)
}

app.get('/', (req, res) => {
  setTimeout(fetchBack, 500)
  res.send('ping')
})

app.listen(port, () => {
  console.log(`Example app listening at http://:${port}`)
})

fetchBack()
