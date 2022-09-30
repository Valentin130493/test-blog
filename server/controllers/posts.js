const pool = require("../db/db.js");

const getPosts = (request, response) => {
    pool.query('SELECT * FROM posts ORDER BY post_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPostById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query(`SELECT * FROM posts WHERE id = ${id}`, [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPost = async (request, response) => {
    const {title, content, imageUrl} = request.body

    await pool.query('INSERT INTO posts (title, content, image) VALUES ($1, $2, $3) RETURNING *', [title, content, imageUrl], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0])
    })
}
const getPostsWithComments = (request, response) => {
    pool.query('SELECT p.*, json_agg(c) as comments from posts JOIN (SELECT comments.*, to_json(u) as user from comments JOIN users u on u.user_id = comments.user_id) c on c.post_id = p.post_id GROUP BY p.post_id', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updatePost = (request, response) => {
    const id = parseInt(request.params.id)
    const {name, email} = request.body

    pool.query(
        'UPDATE posts SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deletePost = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM posts WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getPostsWithComments
}