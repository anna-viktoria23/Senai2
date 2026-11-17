create database oficina_db;
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
('Ana Souza', 'd940cf72042e09ebf66d40c42ac1855a', '11999999999', '$2b$10$Gvb5uLrfCHdolHYfmu628.bf6feZXJyRfsTKQHyNB/OvdpqJSoxdS'),
('Pedro Lima', 'ae15c665f0cbb695df115f5f7159e9db', '11988888888', '$2b$10$Gvb5uLrfCHdolHYfmu628.bf6feZXJyRfsTKQHyNB/OvdpqJSoxdS'),
('Maria Santos', 'ffc65abf38ea92b01dcfcd331c607272', '11977777777', ''$2b$10$Gvb5uLrfCHdolHYfmu628.bf6feZXJyRfsTKQHyNB/OvdpqJSoxdS);


INSERT INTO veiculo (marca, modelo, cliente_id) VALUES
('Fiat', 'Uno', 1),
('Honda', 'Civic', 2),
('Volkswagen', 'Gol', 3);


INSERT INTO agendamento (data_hora, usuario_id, veiculo_id) VALUES
('2026-11-10 08:00:00', 1, 1),
('2026-11-11 10:00:00', 1, 2),
('2026-11-12 14:00:00', 1, 3);