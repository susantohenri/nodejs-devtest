const express = require(`express`)
const multer = require(`multer`)
const { authGenerateToken, authValidateToken } = require(`./routes/auth.route`)
const { userCreate, userRetrieve, userDelete } = require(`./routes/user.route`)

const app = express()
app.use(express.urlencoded({ extended: true }))

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.get(`/health-check`, (req, res) => {
    res.sendStatus(200)
})

app.post(`/auth`, authGenerateToken)
app.post(`/create-user`, [authValidateToken, upload.single(`picture`)], userCreate)
app.get(`/retrieve-user`, authValidateToken, userRetrieve)
app.delete(`/delete-user`, authValidateToken, userDelete)

app.listen(3000, () => {
    console.log(`App is running`)
})