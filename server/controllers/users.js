const { prisma } = require('../prisma/prismaClient');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route POST /api/user/login
 * @desс Логин
 * @access Public
 */
const loginController = async (req, res) => {
    const { login, password } = req.body;
    if (!login && !password) {
        res.status(400).json({
            message: "Заполните обязательные поля"

        })
    }

    const user = await prisma.user.findFirst({
        where: {login: login},
    });

    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

    if (isPasswordCorrect) {
        res.status(200).json({
            id: user.id,
            login: user.login,
            avatarUrl: user.avatarUrl,
            balance: user.balance,
            token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' })
        })
    } else {
        return res.status(400).json({
            message: "Неверно введен логин или пароль"

        })
    }
};

/**
 *
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */
const registerController = async (req, res, next) => {
    try {
        const { login, password, name } = req.body;

        if(!login || !password, !name) {
            return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' })
        }

        const registeredUser = await prisma.user.findFirst({
            where: {
                login
            }
        });

        if (registeredUser) {
            return res.status(400).json({ message: 'Пользователь, с таким логином уже существует' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                login,
                password: hashedPassword,
                name,
            }
        });

        const secret = process.env.JWT_SECRET;

        if (user && secret) {
            res.status(201).json({
                id: user.id,
                login: user.login,
                token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
            })
        } else {
            return res.status(400).json({ message: 'Не удалось создать пользователя' })
        }
    } catch {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
}

/**
 *
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */
const currentUserController = async (req, res) => {
    return res.status(200).json(req.user)
}

module.exports = {
    loginController, currentUserController, registerController
}