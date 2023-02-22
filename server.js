const express = require('express');
const app = express();
const port = 3000;

const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const cors = require('cors')

const options = {
    swaggerDefinition: {
        info: {
            title: 'Personal Budget API',
            version: '1.0.0',
            description: 'Personal Budget API autogenerated',    
        },
        host: '193.122.192.59:3000',
        basePath: '/',
    },
    apis: ['./server.js'],
}

const specs = swaggerJsdoc(options)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors())

const prices = {
    food: [
        {
            name: 'apple',
            price: 1,
        },
        {
            name: 'orange',
            price: 2,
        },
        {
            name: 'banana',
            price: 3,
        },
    ]
};


/**
 * @swagger
 * /prices:
 *    get:
 *      description: Return all prices
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Object food containing array of food prices
 *          404:
 *              description: Error
 */
app.get('/prices', (req, res) => {
    res.json(prices);
})

/**
 * @swagger
 * /prices/{foodItem}:
 *    post:
 *      description: Adds a new food item
 *      parameters:
 *          - name: foodItem
 *            in: path
 *            description: Name of food to post
 *            schema:
 *              type: string
 *          - name: foodPrice
 *            in: query
 *            description: Price of the food to post
 *            schema:
 *              type: integer
 *              format: int64
 *      responses:
 *          200:
 *              description: New food posted
 *          404:
 *              description: Error
 */
app.post('/prices', (req, res) => {
	const item = req.params
	const price = req.query
	prices.food.push({name: item, price: price})
	res.json(prices)
})

/**
 * @swagger
 * /prices/{foodItem}:
 *    patch:
 *      description: Update a food item name
 *      parameters:
 *          - name: foodItem
 *            in: path
 *            description: Name of food to update
 *            schema:
 *              type: string
 *          - name: newName
 *            in: query
 *            description: Name to give the updated food
 *            schema:
 *              type: integer
 *              format: int64
 *      responses:
 *          200:
 *              description: Food Name successfully updated
 *          404:
 *              description: Error
 */
app.patch('/prices', (req, res) => {
	const {name} = req.params
	const {newname} = req.query
	
	const index = prices.food.findIndex(fooditem => fooditem.name === name)
	if (index !== -1) {
		prices.food[index].name = newname
		res.json(prices)
	} else {
		res.status(404).json({message: 'Food not found'})
	}
})

/**
 * @swagger
 * /prices/{foodItem}:
 *    put:
 *      description: Update a food item price
 *      parameters:
 *          - name: foodItem
 *            in: path
 *            description: Name of food to update
 *            schema:
 *              type: string
 *          - name: newPrice
 *            in: query
 *            description: Price to give the updated food
 *            schema:
 *              type: integer
 *              format: int64
 *      responses:
 *          200:
 *              description: Food Price successfully updated
 *          404:
 *              description: Error
 */
app.put('/prices', (req, res) => {
	const {name} = req.params
	const {price} = req.query
	const index = prices.food.findIndex(fooditem => fooditem.name === name)
	if (index !== -1) {
		prices.food[index].price = Number(price)
		res.json(prices)
	} else {
		res.status(404).json({message: 'Food not found'})
	}
})

/**
/**
 * @swagger
 * /prices/{foodItem}:
 *    delete:
 *      description: Deletes a food item
 *      parameters:
 *          - name: foodItem
 *            in: path
 *            description: Name of food to delete
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Food Name successfully deleted
 *          404:
 *              description: Error
 */
app.delete('/prices:food', (req, res) => {
	const name = req.params
	const index = prices.food.findIndex(fooditem => fooditem.name === name)
	if (index !== -1) {
		prices.food.splice(index, 1)
		res.json(prices)
	} else {
		res.status(404).json({message: 'Food not found'})
	}
})


app.listen(port, () => {
    console.log(`API served at http://193.122.192.59:${port}`);
})
