const { create, retrieve, update, remove } = require(`../services/user.service`)

const userCreate = async (req, res, next) => {
    try {
        const id = await create(req.body.name, req.body.username, req.file)
        res.status(200).json({ id })
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
}

const userRetrieve = async (req, res, next) => {
    try {
        const user = await retrieve(req.query.id)
        res.status(200).json(user)
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
}

const userUpdate = async (req, res, next) => {
    try {
        const id = await update(req.query.id, req.body.name, req.body.username, req.file)
        res.status(200).json({ id })
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
}

const userDelete = async (req, res, next) => {
    try {
        await remove(req.query.id)
        res.status(200).json({id: req.query.id})
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
}
module.exports = { userCreate, userRetrieve, userDelete }