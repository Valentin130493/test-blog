const pool = require("../db/db.js");

const getUsers = (request, response) => {
    pool.query('SELECT user_id, username, email  FROM users ORDER BY user_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = async (request, response) => {
    const {username, email, password} = request.body


    await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password], (error, results) => {
        console.log(results)
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {name, email} = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}