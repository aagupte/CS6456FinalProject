const Gun = require('gun')
const express = require('express')
const app = express()
const port = 3030
app.use(Gun.serve)

const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

Gun({ web: server})