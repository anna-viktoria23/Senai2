const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API Loja_jogos',
        description: 'Documentação automática da API Loja_jogos utilizando o swagger autogen',
        version: '1.0.0'
    },
    host: 'localhost:3001',
    schemes:  ['http']
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log("Documentação gerada com sucesso pelo Swagger!!")
})