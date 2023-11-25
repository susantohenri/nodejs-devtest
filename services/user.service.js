const admin = require(`firebase-admin`)
const serviceAccount = require(`../nodejs-devtest-firebase-adminsdk-xqhjo-925edce53f.json`)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: `nodejs-devtest.appspot.com`,
})
const firestoredb = admin.firestore()
const collection = firestoredb.collection(`users`)
const bucket = admin.storage().bucket()

const create = async (name, username, picture) => {
    try {
        const imageBuffer = picture.buffer
        const ext = picture.originalname.split(`.`).slice(-1)
        const imageName = Math.random().toString().replace(`0.`, ``) + `.` + ext
        const file = bucket.file(imageName)
        await file.save(imageBuffer, { contentType: `image/jpeg` })

        const user = await collection.add({ name, username, picture: imageName })
        return user._path.segments[1]
    } catch (error) {
        return error
    }
}

const retrieve = async (id) => {
    try {
        const user = await collection.doc(id).get()
        const picture = await bucket.file(user._fieldsProto.picture.stringValue)
            .getSignedUrl({
                action: `read`,
                expires: Date.now() + 1000 * 60 * 10
            })
            .then((data) => {
                return data[0]
            })

        return {
            name: user._fieldsProto.name.stringValue,
            username: user._fieldsProto.username.stringValue,
            picture
        }
    } catch (error) {
        return error
    }
}

const update = async (id, name, username, picture) => {
    try {
        const user = await collection.doc(id).get()

        if (picture) {
            const imageBuffer = picture.buffer
            const ext = picture.originalname.split(`.`).slice(-1)
            const imageName = Math.random().toString().replace(`0.`, ``) + `.` + ext
            const file = bucket.file(imageName)
            await file.save(imageBuffer, { contentType: `image/jpeg` })

            bucket.file(user._fieldsProto.picture.stringValue).delete()
        }

        const updated = await collection.doc(id).update({ name, username, picture: imageName })
        return updated
    } catch (error) {
        return error
    }
}

const remove = async (id) => {
    try {
        const user = await collection.doc(id).get()
        bucket.file(user._fieldsProto.picture.stringValue).delete()
        collection.doc(id).delete()
        return user
    } catch (error) {
        return error
    }
}
module.exports = { create, retrieve, update, remove }