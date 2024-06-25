const jwt = require("jsonwebtoken");
const {prisma} = require("../prisma/prismaClient");

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(" ")[1];
        console.log(token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded)

        req.user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            }
        });

        next();
    } catch (error) {
        return res.status(401).json({
            message: error,
        })

    }
};

module.exports = {
    auth
}
