const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const pool = require("../db/db.js");


const register = async (req, res) => {

    const {username, email, password} = req.body
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, passwordHash], (error, results) => {
        if (error) {
            throw error
        }
        const {user_id, email, username} = results.rows[0]
        const token = jwt.sign(
            {
                _id: results.rows[0].user_id,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '30d',
            },
        );

        res.status(200).json({
            user_id,
            email,
            username,
            token
        })
    })
}

const login = async (req, res) => {

    await pool.query(`SELECT user_id, email, username, password FROM users WHERE email = '${req.body.email}' `, (error, results) => {
        const {user_id, email, username} = results.rows[0]
        if (error) {
            throw error
        }
        const token = jwt.sign({
            _id: user_id
        }, process.env.SECRET_KEY, {expiresIn: "30d"})

        res.status(200).json({
            user_id,
            email,
            username,
            token
        })
    })
}


module.exports = {
    register,
    login
}