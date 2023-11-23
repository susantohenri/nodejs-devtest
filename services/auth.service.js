const jwt = require(`jsonwebtoken`)
const config = {
    client_id: `henrisusanto`,
    secret_key: `09f26e402586e2faa8da4c98a35f1b20d6b033c60`,
    expiresIn: 60 * 60
}

const generate = (client_id) => {
    if (config.client_id != client_id) throw new Error(`Invalid Client ID`)
    else return jwt.sign({ client_id }, config.secret_key, { expiresIn: config.expiresIn })
}

const validate = (token) => {
    return jwt.verify(token, config.secret_key, (error, user) => {
        return user.client_id == config.client_id && user.exp > Math.floor(Date.now() / 1000)
    })
}

module.exports = { generate, validate, config }