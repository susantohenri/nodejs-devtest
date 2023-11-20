const express = require(`express`)
const app = express()
const port = 3000
const multer = require(`multer`);
const path = require(`path`);

app.get(`/health-check`, (req, res) => {
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, `public/uploads`));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + `-` + Date.now() + path.extname(file.originalname)
        );
    },
});

app.put(`/contact/upload`,
    multer({ storage: diskStorage }).single(`photo`),
    (req, res) => {
        const file = req.file.path;
        if (!file) {
            res.status(400).send({
                status: false,
                data: `No File is selected.`,
            });
        }
        res.send(file);
    }
);