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
            description: 'Personal Budget API autogenerated by Mitch Bath',    
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
 *      description: Adds a new food item with name and price
 *      parameters:
 *          - name: foodItem
 *            in: path
 *            description: Name of food to post
 *            schema:
 *              type: string
 *          - name: foodPrice
 *            in: query
 *            description: Price of food to post
 *            schema:
 *              type: integer
 *              format: int64
 *      responses:
 *          200:
 *              description: New food posted
 *          404:
 *              description: Error
 */
app.post('/prices/:foodItem', (req, res) => {
	const {foodItem} = req.params
	const {foodPrice} = req.query

	const newitem = {name: foodItem, price: foodPrice}
	prices.food.push(newitem)

	res.json(prices)
})

/**
 * @swagger
 * /prices/{foodItem}:
 *    patch:
 *      description: Update a food item name by name
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
app.patch('/prices/:foodItem', (req, res) => {
	const {foodItem} = req.params
	const {newName} = req.query
	
	const index = prices.food.findIndex(item => item.name === foodItem)
	if (index !== -1) {
		prices.food[index].name = newName
		res.json(prices)
	} else {res.status(404).json({message: 'Food not found'})}
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
app.put('/prices/:foodItem', (req, res) => {
	const {foodItem} = req.params
	const {newPrice} = req.query

	const index = prices.food.findIndex(item => item.name === foodItem)
	if (index !== -1) {
		prices.food[index].price = Number(newPrice)
		res.json(prices)
	} else {res.status(404).json({message: 'Food not found'})}
})

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
app.delete('/prices/:foodItem', (req, res) => {
	const {foodItem} = req.params
	const index = prices.food.findIndex(item => item.name === foodItem)

	if (index !== -1) {
		prices.food.splice(index, 1)
		res.json(prices)
	} else {res.status(404).json({message: 'Food not found'})}
})


app.listen(port, () => {
    console.log(`API served at http://193.122.192.59:${port}`);
})
