const express = require('express')
const app = express()
const userModal = require('./models/UserModal')
const upload = require('./multer-setup')
const sharp = require('sharp')

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/upload", upload.single('image'), async (req, res) => {
    if(!req.file) return res.send("file not found..")
    let newBuffer = req.file.buffer
    try {
        if (req.file.size > 2 * 1024 * 1024) {
            newBuffer = await sharp(req.file.buffer)
                .resize({ width: 1920 })
                .toBuffer()
        }
        const user = await userModal.create({
            name: "meme",
            username: "kunal",
            image: newBuffer
        })
        res.send("file created")
    } catch (error) {
        console.log(error.message)
    }
})

app.get("/show", async (req, res) => {
    const files = await userModal.find()
    res.render("show", { files })
})

app.listen(3000)