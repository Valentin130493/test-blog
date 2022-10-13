const pool = require("../db/db.js");

const getPosts = (request, response) => {
    pool.query('SELECT * FROM posts ORDER BY post_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getPostsWithComments = (request, response) => {
    console.log(request, "1")
    pool.query('SELECT p. *, json_agg(c) as comments from posts p JOIN (SELECT comments. *, to_json(u) as user from comments JOIN users u on u.user_id = comments.user_id) c on c.post_id = p.post_id GROUP BY p.post_id', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getPostById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT p. *, json_agg(c) as comments from posts p JOIN (SELECT comments. *, to_json(u.username) as user from comments JOIN users u on u.user_id = comments.user_id) c on c.post_id = p.post_id GROUP BY p.post_id', (error, results) => {
        if (error) {
            throw error
        }

        const post = results.rows.filter((item) => item.post_id === id)
        if (post.length === 0) {
            response.status(200).json(post)
        } else {
            response.status(200).json(post[0])
        }

        console.log(post)

    })
}

const createPost = async (request, response) => {
    const {title, content, image_url} = request.body

    console.log(request.body)
    pool.query('INSERT INTO posts (title, content, image_url) VALUES ($1, $2, $3) RETURNING *', [title, content, image_url], (error, results) => {

        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0])
    })
}


const updatePost = (request, response) => {
    const id = parseInt(request.params.id)
    const {title, content, image_url} = request.body

    pool.query(
        'UPDATE posts SET title = $1, content = $2 WHERE post_id = $3',
        [title, content, image_url],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Post modified with ID: ${id}`)
        }
    )
}


const deletePost = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM posts WHERE post_id = $1', [id], (error, results) => {
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