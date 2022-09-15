const express = require('express');
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
app.use('/', router)


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});