const fetch = require('node-fetch')
const express = require('express')
const app = express()
const port = 4567
let server1
const registry = 'http://localhost:8080'

const getAddress = () =>
  fetch(registry)
    .then(res => res.json())
    .then(res => {
      server1 = res.server1
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
    body: JSON.stringify({ server0: adress }),
  })

const fetchBack = async () => {
  if (!server1) await getAddress()
  if (!server1) return setTimeout(fetchBack, 1000)
  return fetch(server1)
    .then(res => res.text())
    .then(console.log)
}

app.get('/', (req, res) => {
  setTimeout(fetchBack, 500)
  res.send('ping')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

fetchBack()
getAddress()
register(`http://localhost:${port}`, registry)
