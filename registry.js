const fetch = require('node-fetch')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080

app.use(bodyParser())

let data = {}

app.get('/', (req, res) => {
  res.send(JSON.stringify(data))
})

app.post('/data', (req, res) => {
  data = { ...data, ...req.body }
  console.log(data)
  res.send('ok')
})

app.listen(port, () => {
  console.log(`Example app listening at http://:${port}`)
})
