const UserController = require("../controllers/users.js");
const PostsController = require("../controllers/posts.js")
const AuthController = require('../controllers/auth.js')
const {registerValidation, loginValidation} = require("../validation/authValidators");
const Router = require('express').Router
const router = new Router();


router.get('/users', UserController.getUsers)
router.get('/users/:id', UserController.getUserById)
router.post('/users', UserController.createUser)
router.put('/users', UserController.updateUser)
router.delete('/users/:id', UserController.deleteUser)

router.get('admin/posts', PostsController.getPosts)
router.get('admin/posts/:id', PostsController.getPostById)
router.post('admin/posts', PostsController.createPost)
router.put('admin/posts', PostsController.updatePost)
router.delete('admin/posts/:id', PostsController.deletePost)

router.post('/auth/login', loginValidation, AuthController.login)
router.post('/auth/register', registerValidation, AuthController.register)


module.exports = router