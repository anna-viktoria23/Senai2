require('dotenv').config()

const fs = require('fs')
const path = require('path')
const express = require('express')
const mysql = require('mysql2/promise')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const cookieParser = require('cookie-parser')
const mustache = require('mustache')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true
})

app.use((req, res, next) => {
    const metodo = String(req.body?._method || '').toUpperCase()
    if (req.method === 'POST' && ['PUT', 'DELETE'].includes(metodo)) {
        req.method = metodo
    }
    next()
})

// Função para renderizar o HTML
function mostrar(nome, dados = {}) {
    const arquivo = path.join(__dirname, 'paginas', `${nome}.html`)
    return mustache.render(fs.readFileSync(arquivo, 'utf8'), dados)
}

// Criptografa o CPF que o usuário digita
function criptografar(texto) {
    const cifra = crypto.createCipheriv('aes-256-cbc', process.env.CRIPTO_CHAVE, process.env.CRIPTO_IV)
    return cifra.update(texto, 'utf8', 'hex') + cifra.final('hex')
}

// Descriptografia
function descriptografar(texto) {
    const decifra = crypto.createDecipheriv('aes-256-cbc', process.env.CRIPTO_CHAVE, process.env.CRIPTO_IV)
    return decifra.update(texto, 'hex', 'utf8') + decifra.final('utf8')
}

// Função para excluir qualquer tabela por id
async function excluir(res, tabela, id, volta, motivo) {
    try {
        await db.query(`DELETE FROM ${tabela} WHERE id = ?`, [id])
        res.redirect(volta)
    } catch (erro) {
        if (erro.code === 'ER_ROW_IS_REFERENCED_2' || erro.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(409).send(`<p>Não foi possível excluir: ${motivo}</p><p><a href="${volta}">Voltar</a></p>`)
        }
        console.log(erro)
        res.status(500).send(`<p>Erro ao excluir.</p><p><a href="${volta}">Voltar</a></p>`)
    }
}

// Mostrar tela de login
app.get('/', (req, res) => {
    res.send(mostrar('login'))
})

app.post('/login', async (req, res) => {
    const { email, senha } = req.body
    const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email])
    const usuario = usuarios[0]

    // Corrigido: verifica !usuario (singular) antes de comparar a senha
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        return res.send(mostrar('login', { erro: 'E-mail ou senha inválidos' }))
    }

    const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.cookie('token', token, { httpOnly: true })
    res.redirect('/principal')
})

app.post('/sair', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

// Validação JWT
app.use((req, res, next) => {
    try {
        req.usuario = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        next()
    } catch (erro) {
        res.redirect('/')
    }
})

// Exibe o front principal
app.get('/principal', (req, res) => {
    res.send(mostrar('principal', { nome: req.usuario.nome }))
})

// Consulta clientes (corrigido '/clientes', 'SELECT', busca vazia '' e removido res.send duplicado)
app.get('/clientes', async (req, res) => {
    const busca = req.query.busca || ''

    const [lista] = await db.query('SELECT * FROM clientes WHERE nome LIKE ?', [`%${busca}%`])

    const clientes = lista.map((cliente) => ({ ...cliente, cpf: descriptografar(cliente.cpf) }))

    const editar = clientes.find((cliente) => String(cliente.id) === req.query.editar)

    res.send(mostrar('clientes', {
        busca,
        clientes,
        editando: Boolean(editar),
        acao: editar ? `/clientes/${editar.id}` : '/clientes',
        form: editar || {}
    }))
})

// Cadastra cliente (corrigido '/clientes')
app.post('/clientes', async (req, res) => {
    const { nome, cpf, telefone, email } = req.body

    await db.query(
        'INSERT INTO clientes (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)',
        [nome, criptografar(cpf), telefone, email]
    )

    res.redirect('/clientes')
})

// Exclui cliente (corrigido nome da tabela para 'clientes')
app.delete('/clientes/:id', async (req, res) => {
    await excluir(res, 'clientes', req.params.id, '/clientes', 'O cliente possui veículos cadastrados')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Oficina torque rodando em http://localhost:${port}`)
})