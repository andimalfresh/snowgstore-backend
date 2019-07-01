const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT || 4000
const app = express()

// Middleware
app.use(cors())
app.use(morgan('dev'))

//Sequelize Models

const db = require('./models')
const Category = db.Category
// Router Files 

// Routes 
app.get('/api/test', (req, res,) => {
    res.json ({
        message:'We got Routes'
    })
    // const error = new Error('Something Broke')
})

app.get('/api/categories', (req, res, next) => {
    Category.findAll()
    .then(categories => {
        res.json({
            categories
        })
    })
    .catch(error => {
        next(error)
    })
})

//Error Handling 
// The following 2 `app.use`'s MUST follow ALL your routes/middleware
app.use(notFound)
app.use(errorHandler)

function notFound(req, res, next) {
    res.status(404).send({ error: 'Not found!', status: 404, url: req.originalUrl })
}

// eslint-disable-next-line
function errorHandler(err, req, res, next) {
    console.error('ERROR', err)
    const stack = process.env.NODE_ENV !== 'production' ? err.stack : undefined
    res.status(500).send({ error: err.message, stack, url: req.originalUrl })
}

app.listen(PORT, () => {
    // eslint-disable-next-line no-undef
    console.log(`Server going deep on ${PORT}`)
})