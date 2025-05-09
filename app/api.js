const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT;
const urlQrMp = process.env.URL_MP_QR;
const authToken = process.env.BEARER_TOKEN_MP;

app.use(express.json());

app.post('/qr/:userId/:externalPosId', async (req, res) => {
    const { userId, externalPosId } = req.params;
    const body = req.body;

    if (!userId || !externalPosId || !body) {
        return res.status(400).send('Parâmetros ou corpo da requisição ausentes!');
    }

    const url = urlQrMp
        .replace('{0}', userId)
        .replace('{1}', externalPosId);

    try {
        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });
        res.status(201).send(response.data);
    } catch (error) {
        const raw = error.response?.data.message;

        let detalhes = typeof raw === 'string' ? JSON.parse(raw) : raw;

        res.status(500).json({
            error: 'Erro ao gerar Qr Code',
            details: detalhes
        });

    }
});


app.post('/notification', (req, res) => {
    console.log(req.body);
    res.status(201).send('Dados recebidos com sucesso!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em ${port}`);
});