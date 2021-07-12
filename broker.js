require('dotenv').config()
const fetch = require('node-fetch')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 1111
const registry = process.env.REGISTRY || 'http://localhost:8080'
const address = process.env.ADDRESS || 'http://localhost'
app.use(bodyParser())

let data = {}

const sendMessage = ({ dest, message }) => {
  console.log({ dest, message })
  return fetch(`${data[dest]}/${message}`)
}

app.post('/send', (req, res) => {
  const { dest, message } = req.body
  sendMessage({ dest, message })
  res.send('ok')
})

app.listen(port, () => {
  console.log(`Example app listening at ${address}:${port}`)
})

const getAddresses = () =>
  fetch(registry)
    .then(res => res.json())
    .then(res => {
      data = res
      console.log(res)
      if (!server1) setTimeout(getAddress, 1000)
    })
    .catch(err => {
      err => setTimeout(getAddress, 1000)
    })

const register = (adress, registry) =>
  fetch(registry + '/data', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ broker: adress }),
  })

getAddresses()
register(`${address}:${port}`, registry)
