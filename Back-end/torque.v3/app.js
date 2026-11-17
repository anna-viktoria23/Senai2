require('dotenv').config()

const fs = require('fs')
const path = require('path')
const express = require('express')
const mysql = require('mysql2/promise')
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const cookieParser = require('cookie-parser')
const Mustache = require('mustache')

const app = express()

app.use(express.urlencoded({extended: false})) //

app.use(cookieParser())

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,  
    database: process.env.DB_NAME,
    dateStrings: true
})

app.use((req,res,next) => 
{
    const metodo = String(req.body?._method || '').toUpperCase()
    if(req.method === 'POST' && ['PUT', 'DELETE'].includes(method)){
        req.method = metodo
    }
     next()
}) //next para post e delete



//função pro html
function mostrar (nome, dados ={}) {
    const arquivo = path.join(__dirname, 'paginas', `${nome}.html`)

    return mustache.render(fs.readFileSync(arquivo, 'utf8'), dados)
}


//criptografa o cpf que o usuario digita
function criptografar(texto){
    const cifra =crypto.createCipheriv('aes-256-cbc', process.env.CRIPTO_CHAVE, process.env.CRIPTO_IV)

    return cifra.update(texto, 'utf8', 'hex') + cifra.final('hex')
}

//descriptografia 
function descriptografar(texto){
    const decifra = crypto.createDecipheriv('aes-256-cbc', process.env.CRIPTO_CHAVE, process.env.CRIPTO_IV)

    return decifra.update(texto, 'hex', 'utf8') + decifra.final('utf8') //inverte a lógica do cifra
}

//função para excluir qualquer tabela por id
async function excluir(res, tabela, id, volta, motivo){
    try {
        await db.query(`DELETE FROM ${tabela} WHERE id = ?`, [id])

        res.redirect(volta)
    } catch (erro) {
        if(erro.code === 'ER_ROW_ID_REFERENCED_2'){
            return res.status(409).send(`<p>Não foi possivel excluir: ${motivo}</p> <p><a href="${volta}"></a></p>`)
        }
        console.log(erro)
        res.status(500).send(`<p> Erro ao excluir.</p><p><a herf="${volta}"</a></p>`)
    }
}

//mostrar tela de login
app.get('/', (req,res) => {
    res.send(mostrar('login'))
})

app.post('/login', async(req,res) => {
    
})


const port = process.env.DB_PORT || 3000
app.listen(port, () => {
    console.log(`Oficinal torque rodando em http://localhost:${port}`)
})