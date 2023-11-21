const express = require(`express`)
const multer = require(`multer`)
const admin = require(`firebase-admin`)
const serviceAccount = require(`./nodejs-devtest-firebase-adminsdk-xqhjo-925edce53f.json`)

const app = express()
const port = 3000

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: `nodejs-devtest.appspot.com`,
})
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.get(`/health-check`, (req, res) => {
    res.sendStatus(200)
})

app.put(`/contact/upload`, upload.single(`photo`), async (req, res) => {
    try {
        const bucket = admin.storage().bucket()
        const imageBuffer = req.file.buffer
        const imageName = req.file.originalname
        const file = bucket.file(imageName)
        const result = await file.save(imageBuffer, { contentType: `image/jpeg` })
        res.sendStatus(200)
    } catch (error) {
        console.error(`Error uploading image:`, error)
        res.status(500).send(`Error uploading image.`)
    }
})

app.get(`/images`, async (req, res) => {
    try {
        const bucket = admin.storage().bucket()
        bucket.file(`Screenshot18.png`)
            .getSignedUrl({
                action: `read`,
                expires: Date.now() + 1000 * 60 * 10
            }).then((data) => {
                res.send(data[0])
            })
    } catch (error) {
        console.error(`Error fetching images:`, error)
        res.status(500).send(`Error fetching images.`)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})