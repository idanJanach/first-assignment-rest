const express = require('express')
const app = express()
require('dotenv').config()
const postsRouter = require('./routes/posts')

const port = process.env.PORT

app.use('/posts', postsRouter)

app.listen(port, () => {
    console.log(`app listening at port ${port}`);
})