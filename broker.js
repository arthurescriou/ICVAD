require('dotenv').config()
const fetch = require('node-fetch')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = parseInt(process.env.PORT) || 1111
const registry = process.env.REGISTRY || 'http://localhost:8080'
const address = process.env.ADDRESS || 'http://localhost'
app.use(bodyParser())

let data = {}

const sendMessage = ({ dest, message }) => {
  console.log({ dest, message, url: `${data[dest]}/${message}` })
  if (data[dest]) return fetch(`${data[dest]}/${message}`)
  else
    return new Promise((resovle, reject) => {
      setTimeout(
        () =>
          getAddresses()
            .then(sendMessage({ dest, message }))
            .then(resolve)
            .catch(reject),
        1000
      )
    })
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
      if (!server1) setTimeout(getAddresses, 1000)
    })
    .catch(err => {
      err => setTimeout(getAddresses, 1000)
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
