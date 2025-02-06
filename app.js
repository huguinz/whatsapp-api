const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next)=> { 
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Crontol-Allow-Methods', 'GET')

    app.use(cors())

    next()
})

let whatsapp = require('./funcoes')

app.get('/v1/whatsapp/data/:numero', async function(request, response) {
    let uf = request.params.numero;
    let dados = whatsapp.getPersonalDate(uf);
  
    if (dados) { 
      response.status(200).json(dados);
    } else {
      response.status(404).json({ 'status': 404, 'message': 'Dados não localizados.' })
    }
  })

  app.get('/v1/whatsapp/data2/:numero', async function(request, response) {
    let uf = request.params.numero;
    let dados = whatsapp.getUserAccountData(uf);
  
    if (dados) { 
      response.status(200).json(dados);
    } else {
      response.status(404).json({ 'status': 404, 'message': 'Dados não localizados.' })
    }
})

app.get('/v1/whatsapp/data3/:numero', async function(request, response) {
    let uf = request.params.numero;
    let dados = whatsapp.getContactsData(uf);
  
    if (dados) { 
      response.status(200).json(dados);
    } else {
      response.status(404).json({ 'status': 404, 'message': 'Dados não localizados.' })
    }
  })
  
  app.listen('8080', function() {
    console.log('API aguardando requisições...');
})
