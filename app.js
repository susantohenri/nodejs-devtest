const express = require('express')
const app = express()
const port = 3000

var admin = require(`firebase-admin`)
var serviceAccount = require(`./nodejs-devtest-firebase-adminsdk-xqhjo-925edce53f.json`)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const firestoredb = admin.firestore()

app.get('/health-check', (req, res) => {
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.post(`/insert`, async (req, res) => {
    const collection = firestoredb.collection(`users`)
    // var resp = await collection.add({henri: `susanto`})
    // var resp = await collection.doc(`CP5muvy5u03MTE1jDviY`).delete()
    var resp = await collection.doc(`2gUyHjczqsDxMQgDXVjV`).update({henri: `ikadewi`})
    res.send(resp)
})