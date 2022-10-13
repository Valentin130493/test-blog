const pool = require("../db/db.js");


const createComment = (request, response) => {
    const {content, post_id, user_id} = request.body
    console.log(request.body)
    pool.query('INSERT INTO comments (content,post_id,user_id ) VALUES ($1, $2, $3) RETURNING *', [content, post_id, user_id], (error, results) => {
        if (error) {
            throw error
        }
        //     ?
        response.status(200).json(results.rows[0])
    })
}

module.exports = {
    createComment
}
