const express = require(`express`)
const { authGenerateToken } = require(`./routes/auth.route`)

const app = express()
app.use(express.urlencoded({ extended: true }))

app.get(`/health-check`, (req, res) => {
    res.sendStatus(200)
})

app.post(`/auth`, authGenerateToken)

app.listen(3000, () => {
    console.log(`App is running`)
})