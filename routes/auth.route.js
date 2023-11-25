const { generate, validate } = require(`../services/auth.service`)

const authGenerateToken = (req, res, next) => {
    try {
        const jwt = generate(req.body.clientId)
        res.status(200).json({ token: jwt })
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }

}

const authValidateToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(` `)[1]
        const isAuthorized = validate(token)
        if (isAuthorized) next()
        else res.status(401).json({ error: `request unauthorized` })
    } else {
        res.status(401).json({ error: `request unauthorized` })
    }
}

module.exports = { authGenerateToken, authValidateToken }