const { generate } = require(`../services/auth.service`)

const authGenerateToken = (req, res, next) => {
    try {
        const jwt = generate(req.body.clientId)
        res.status(200).json({ token: jwt })
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }

}

module.exports = { authGenerateToken }