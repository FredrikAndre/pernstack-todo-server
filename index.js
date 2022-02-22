const express = require('express')
const app = express()
const cors = require('cors')

// middleware
app.use(cors())
app.use(express.json()) // Allows access to req.body

// Load route
app.use('/', require('./routes/todo'))

app.listen(5000, () => {
  console.log('Server is starting on port 5000')
})
