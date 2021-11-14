import cors from 'cors'
import express, { Response } from 'express'
import moment from 'moment'
import mongodb, { Collection, Db, MongoClient } from 'mongodb'
import { collections, connectToDatabase } from './db'
import { TestEntity } from './models/TestEntity'
import { TEST_CLIENT_CONSTANT } from './shared-client/constants/TEST_CLIENT_CONSTANT'
import { IS_PRODUCTION_ENV } from './constants/IS_PRODUCTION_ENV'
import { PORT } from './shared-server/constants/PORT'
import { TestEntityC } from './shared-server/models/TestEntity'

const app = express() // initialize express server
if (!IS_PRODUCTION_ENV) // if in development environment allow cors from frontend dev origin 
  app.use(cors({origin:'http://localhost:3000'}))

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies


// - routes
const baseApiUrl = '/api'
app.get(`${baseApiUrl}/`, (req, res) => res.send('Express + TypeScript Server'))
app.get(`${baseApiUrl}/test`, async (req, res) => {
  const nowString = moment().format()
  
  const testEntities = await collections.testEntities?.find().toArray() as TestEntity[]
  const numGuys = testEntities.length

  res.json({
    message: `You just successfully queried the server at ${nowString}. ${TEST_CLIENT_CONSTANT}. Number of test entities in database: ${numGuys}. First entity name: ${testEntities[0]?.name}`,
  })
})

// TestEntity CRUD
app.get(`${baseApiUrl}/testEntity`, async (req, res: Response<TestEntity[]>) => {
  const testEntities = await collections.testEntities?.find({}).toArray()
  return res.json(testEntities)
})
app.get(`${baseApiUrl}/testEntity/:id`, async (req, res: Response<TestEntity | null>) => {
  const testEntity = await collections.testEntities?.findOne({id: req.params.id})
  return res.json(testEntity)
})
// app.post('/testEntity', async (req, res: Response<TestEntityC[]>) => {
//   const testEntityNew: TestEntity = {
//     ...req.body,
//   }
//   collections.testEntities?.insertOne(testEntityNew)
//   // const testEntity = await collections.testEntities?.findOne({id: testEntityNew.id})
//   return res.json(testEntityNew)
// })
app.delete(`${baseApiUrl}/testEntity/:id`, async (req, res: Response<{message: string}>) => {
  const testEntity = await collections.testEntities?.remove({id: req.params.id})
  return res.json({message: `Success: testEntity with id ${req.params.id} deleted.`})
})

// - start application
const envString = process.env.NODE_ENV
connectToDatabase()
const serverStartMessage = `⚡️[server]: ${envString} server is running at https://localhost:${PORT}`

app.listen(PORT, () => { console.log(serverStartMessage) })
