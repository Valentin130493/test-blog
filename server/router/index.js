const UserController = require("../controllers/users.js");
const PostsController = require("../controllers/posts.js")
const CommentsController = require("../controllers/comments")
const AuthController = require('../controllers/auth.js')
const {registerValidation, loginValidation} = require("../validation/authValidators");
const Router = require('express').Router
const router = new Router();


router.get('/admin/users', UserController.getUsers)
router.get('/admin/users/:id', UserController.getUserById)
router.post('/admin/users', UserController.createUser)
router.put('/admin/users', UserController.updateUser)
router.delete('/admin/users/:id', UserController.deleteUser)

router.get('/posts', PostsController.getPosts)
router.get('/posts/:id', PostsController.getPostById)

router.post('/admin/posts', PostsController.createPost)
router.put('/admin/posts/:id', PostsController.updatePost)
router.delete('/admin/posts/:id', PostsController.deletePost)


router.post('/comment', CommentsController.createComment)
router.get('/posts/comments', PostsController.getPostsWithComments)

router.post('/auth/login', loginValidation, AuthController.login)
router.post('/auth/register', registerValidation, AuthController.register)


module.exports = router