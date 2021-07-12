require('dotenv').config()
const fetch = require('node-fetch')
const express = require('express')
const app = express()
const port = parseInt(process.env.PORT) || 4567
let broker
const registry = process.env.REGISTRY || 'http://localhost:8080'
const address = process.env.ADDRESS || 'http://localhost'

const getAddress = () =>
  fetch(registry)
    .then(res => res.json())
    .then(res => {
      broker = res.broker
      console.log(res)
      if (!broker) setTimeout(getAddress, 1000)
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
    body: JSON.stringify({ server0: adress }),
  })

const fetchBack = async () => {
  if (!broker) await getAddress()
  if (!broker) return setTimeout(fetchBack, 1000)
  return fetch(broker + '/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ dest: 'server1', message: 'pong' }),
  }).then(res => res.text())
}

app.get('/ping', (req, res) => {
  setTimeout(fetchBack, 500)
  res.send('ok')
})

app.listen(port, () => {
  console.log(`Example app listening at ${address}:${port}`)
})

getAddress().then(fetchBack)
register(`${address}:${port}`, registry)
