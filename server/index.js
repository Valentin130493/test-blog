const express = require('express');
const multer = require('multer')
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const router = require('./router/index.js')
dotenv.config();

const app = express();
const port = process.env.PORT;


app.use(express.json())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads")
    }, filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({storage})
app.use('/uploads', express.static('uploads'))

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        res.json({
            url: `uploads/${req.file.originalname}`
        })
    } catch (err) {
        console.log(err)
    }
})

app.use('/', router)


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});