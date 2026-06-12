<<<<<<< HEAD
const pool = require('./config/database')
const app = require('./app')

const PORT = 3000

pool.getConnection((err,connection) => {
    if (err) {
      console.error('Erro ao conectar ao Banco:', err)
      process.exit(1)  
    }

    console.log('Conectado ao MySQL!')
    connection.release()
})

app.listen ((PORT), () => {
    console.log ('Servidor Rodando na Porta 3000!')
})
=======

const app = require('./app');
const pool = require('./config/database');

const PORT = 3000;

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar no banco:', err);
        process.exit(1);
    }

    console.log('Conectado ao MySQL com sucesso! 🎉');
    connection.release();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
