const pool = require('../config/database');

class CategoriaRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM categoria ORDER BY id DESC');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM categoria WHERE id = ?', [id]);
        return rows[0];
    }
     async create(categoriaData) {
        const { nome } = categoriaData;
        const [result] = await pool.query(
            'INSERT INTO categoria (nome) VALUES (?)',
            [nome]
        );
        return result.insertId;
    }


    async update(id, categoriaData) {
        const fields = [];
        const values = [];
        for (const [key, value] of Object.entries(categoriaData)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
        if (fields.length === 0) return null;

        values.push(id);
        const query = `UPDATE categoria SET ${fields.join(', ')} WHERE id = ?`;
        const [result] = await pool.query(query, values);
        return result.affectedRows;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM categoria WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = new CategoriaRepository();