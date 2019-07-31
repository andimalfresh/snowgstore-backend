require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const PORT = process.env.PORT || 4000
const app = express()

// Middleware
app.use(cors())
app.use(morgan('dev'))

//Sequelize Models

const db = require('./models')
const Category = db.Category
const Product = db.Product
// Router Files 

// Routes 
app.get('/api/test', (req, res,) => {
    res.json ({
        message:'We got Routes'
    })
    // const error = new Error('Something Broke')
})

app.get('/api/categories', (req, res, next) => {
    Category.findAll({
        include: [{ model : Product }]
     })
    .then(categories => {
        res.json({
            categories
        })
    })
    .catch(error => {
        next(error)
    })
})

app.get('/api/products', (req, res, next) => {
    Product.findAll({
        include: [{model: Category}]
    })
    .then(products => {
        res.json({
            products
        })
    })
        .catch(error => {
            next(error)
        })
    })
app.get('/api/products/:id', (req, res, next) => {
    const id = req.params.id

    Product.findByPk(id, {
        include: [{ model: Category}]
    })
        .then(product => {
            res.json({
                 product    
            })
        })
        .catch(error => {
            console.log (error)
        })
})

app.post('/api/checkout', async (req, res, next) => {
    const lineItems = [{
      name: 'T-shirt',
      description: 'Comfortable cotton t-shirt',
      images: ['http://lorempixel.com/400/200/'],
      amount: 500,
      currency: 'usd',
      quantity: 1,
    }]
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel'
      })
      res.json({ session })
    }
    catch (error) {
      next(error) 
    }
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