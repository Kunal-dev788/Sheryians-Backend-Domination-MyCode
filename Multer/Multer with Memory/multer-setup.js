const multer = require('multer')
const path = require('path')

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    const extNames = ['.png', '.jpeg', '.jpg', '.webp']
    let ext = path.extname(file.originalname).toLowerCase()
    const isAllowed = extNames.includes(ext)

    if (isAllowed) {
        cb(null, true)
    } else {
        cb(new Error("These file types are not allowed"))
        // or: cb(null, false)
    }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } })

module.exports = upload
