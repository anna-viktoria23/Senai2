require('dotenv').config()
const fs = require('fs') //manipulação de arquivos
const path = require('path') //caminho
const bcrypt = require('bcryptjs') //senha
const crypto = require ('crypto') //criptografia

//função para fazer a criptografia do cpf
function criptografraCpf(texto) {
    //dizendo como trabalhar
    const cifra = crypto.createCipheriv  //função da bibliotrca crypto
        ('aes-256-cbc', process.env.CRIPTO_CHAVE, process.env.CRIPTO_IV) //importanto do dotenv chave privada e publica

    //retorno do valor criptografdo
    return cifra.update(texto, 'utf8', 'hex') + cifra.final('hex') //hexadecimal
}

//salvar senha
const senhaHash = bcrypt.hashSync('1234', 10) //senha e salto. senhas com hash diferetes

const cpf1= criptografraCpf('12312312322')
const cpf2 = criptografraCpf('12312312333')
const cpf3 = criptografraCpf('12312312344')

const sql = `create database oficina_db;
USE oficina]_db;


create table usuario(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR (150) NOT NULL
);


create table cliente(
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
cpf INT(11) NOT NULL UNIQUE,
telefone VARCHAR(20) NOT NULL
);


CREATE TABLE IF NOT EXISTS veiculo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    CONSTRAINT fk_cliente
		FOREIGN KEY (cliente_id)
        REFERENCES cliente(id)
        ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS agendamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_hora DATETIME NOT NULL,
    CONSTRAINT fk_id_usuario
		FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE,
        
	CONSTRAINT fk_id_veiculo
		FOREIGN KEY (veiculo_id)
        REFERENCES veiculo(id)
        ON DELETE CASCADE
);


INSERT INTO cliente (nome, cpf, telefone, senha) VALUES
('Ana Souza', '${cpf1}', '11999999999', '${senhaHash}'),
('Pedro Lima', '${cpf2}', '11988888888', '${senhaHash}'),
('Maria Santos', '${cpf3}', '11977777777', ''${senhaHash});


INSERT INTO veiculo (marca, modelo, cliente_id) VALUES
('Fiat', 'Uno', 1),
('Honda', 'Civic', 2),
('Volkswagen', 'Gol', 3);


INSERT INTO agendamento (data_hora, usuario_id, veiculo_id) VALUES
('2026-11-10 08:00:00', 1, 1),
('2026-11-11 10:00:00', 1, 2),
('2026-11-12 14:00:00', 1, 3);`

const caminhoSaida = path.join(__dirname, 'database', 'script.sql') //criar o caminho que vai salvar o arquivo

fs.writeFileSync(caminhoSaida,sql) //cria o arquivo

console.log(`Arquivo gerado em ${caminhoSaida}`)