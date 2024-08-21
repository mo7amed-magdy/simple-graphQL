import express from 'express'
import { dbConnection } from './databases/dbConnection.js'
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './schema/schema.js';
import playGround from "graphql-playground-middleware-express"
import { categoryModel } from './databases/category.model.js';
import cors from "cors"

const app = express()
const port = 3000
const expressPlayground = playGround.default
app.use(cors())


dbConnection()
app.use(express.json())
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
app.use('/graphql', createHandler({schema}))
app.get('/', (req, res) => res.send('Hello World!'))
app.post('/', async (req, res) =>{ 
    let category = await categoryModel.insertMany(req.body)
    res.json({message: 'Hello World!',category})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))