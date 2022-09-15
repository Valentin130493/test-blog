const {body} = require('express-validator');

const loginValidation = [
    body('email', "Invalid email").isEmail(),
    body('password', "Password length can't be less 5 symbols").isLength({min: 5}),
]

const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('username', 'Укажите имя').isLength({min: 3}),
]

module.exports = {
    loginValidation,
    registerValidation
}