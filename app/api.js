const express = require('express')
const axios = require('axios')
const WebSocket = require('ws')
const http = require('http')

const app = express()
const port = process.env.PORT
const urlQrMp = process.env.URL_MP_QR
const authToken = process.env.BEARER_TOKEN_MP

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

app.use(express.json())

app.post('/qr/:userId/:externalPosId', async (req, res) => {
  const { userId, externalPosId } = req.params
  const body = req.body

  if (!userId || !externalPosId || !body) {
    return res.status(400).send('Parâmetros ou corpo da requisição ausentes!')
  }

  const url = urlQrMp.replace('{0}', userId).replace('{1}', externalPosId)

  try {
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    })
    res.status(201).send(response.data)
  } catch (error) {
    const raw = error.response?.data.message

    let detalhes = typeof raw === 'string' ? JSON.parse(raw) : raw

    res.status(500).json({
      error: 'Erro ao gerar Qr Code',
      details: detalhes
    })
  }
})

app.post('/notification', (req, res) => {
  // Envia os dados recebidos para o Websocket
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(req.body))
    }
  })

  res.status(201).send('Dados recebidos com sucesso!')
})

wss.on('connection', ws => {
  ws.send('Bem-vindo ao servidor WebSocket!')
})

server.listen(port, () => {
  console.log(`Servidor rodando em ${port}`)
})