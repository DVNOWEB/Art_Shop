const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

// connect to the database
const PORT = process.env.PORT || 8000

// connect to the database
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log('DB Connected!'))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`)
  })