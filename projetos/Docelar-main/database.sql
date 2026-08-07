CREATE DATABASE db_docelar;
USE db_docelar;

CREATE TABLE funcionario (
    id_funcionario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fornecedor (
    id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    valor_unitario DECIMAL(10,2) NOT NULL CHECK (valor_unitario >= 0),
    id_categoria INT,
    id_fornecedor INT,
    id_funcionario INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
    FOREIGN KEY (id_fornecedor) REFERENCES fornecedor(id_fornecedor),
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id_funcionario)
);

CREATE TABLE estoque (
    id_estoque INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL,
    id_fornecedor INT,
    quantidade INT NOT NULL DEFAULT 0 CHECK (quantidade >= 0),
    validade DATE,
    data_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto),
    FOREIGN KEY (id_fornecedor) REFERENCES fornecedor(id_fornecedor)
);

CREATE TABLE movimentacao_estoque (
    id_movimentacao INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('ENTRADA', 'SAIDA', 'DEVOLUCAO') NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    valor_unitario DECIMAL(10,2) CHECK (valor_unitario >= 0),
    motivo_devolucao VARCHAR(255),
    observacao TEXT,
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_estoque INT NOT NULL,
    id_funcionario INT NOT NULL,
    FOREIGN KEY (id_estoque) REFERENCES estoque(id_estoque),
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id_funcionario)
);

CREATE TABLE IF NOT EXISTS imagem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    link TEXT NULL,
    id_produto INT NOT NULL,
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);

DELIMITER $$

CREATE TRIGGER trg_atualiza_estoque
AFTER INSERT ON movimentacao_estoque
FOR EACH ROW
BEGIN
    IF NEW.tipo = 'SAIDA' THEN
        UPDATE estoque
        SET quantidade = quantidade - NEW.quantidade
        WHERE id_estoque = NEW.id_estoque;
    ELSEIF NEW.tipo = 'DEVOLUCAO' THEN
        UPDATE estoque
        SET quantidade = quantidade + NEW.quantidade
        WHERE id_estoque = NEW.id_estoque;
    END IF;
END$$

DELIMITER ;

