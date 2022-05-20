import cors from 'cors'
import express, { Response } from 'express'
import moment from 'moment'
import { IS_PRODUCTION_ENV } from './constants/IS_PRODUCTION_ENV'
import { collections, connectToDatabase } from './db'
import { TEST_CLIENT_CONSTANT } from './shared-client/constants/TEST_CLIENT_CONSTANT'
import { PORT } from './shared-server/constants/PORT'
import { TestEntity, TestEntityC, TestEntityCToModel } from './shared-server/models/TestEntity'

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
app.post(`${baseApiUrl}/testEntity`, async (req, res: Response<TestEntityC[]>) => {
  const testEntityNew: TestEntity = TestEntityCToModel({
    ...req.body,
    name: 'wowee',
    id: 'wowee',
    createdAt: moment(),
  })
  const dbResult = await collections.testEntities?.insertOne(testEntityNew)
  const testEntityC: TestEntityC = {...testEntityNew, createdAt: testEntityNew.createdAt.format()}
  return res.json([testEntityC])
})
app.delete(`${baseApiUrl}/testEntity/:id`, async (req, res: Response<{message: string}>) => {
  const testEntity = await collections.testEntities?.remove({id: req.params.id})
  return res.json({message: `Success: testEntity with id ${req.params.id} deleted.`})
})

// deck CRUD
app.get(`${baseApiUrl}/deck/:id`, (req, res) => {res.json({message: 'TODO:'})})
app.post(`${baseApiUrl}/deck`, deckAddRoute)
export async function deckAddRoute(req: express.Request, res: express.Response) {
  const idUser = 'get-this-from-auth'
  const result = await deckAdd(idUser, req.body.name)
  return result.result
}

async function deckAdd(idUser: string, name: string) {
  // console.log(`collections: ${Object.keys(collections).join(', ')}`)
  const result = await collections.decks.insertOne({
    idsCard: [],
    idsUser: [idUser],
    name,
  })
  return result
  // return {result: 'TODO:'}
}

// app.post(`${baseApiUrl}/card`, cardAddRoute)

// - start application
const envString = process.env.NODE_ENV
connectToDatabase()
const serverStartMessage = `⚡️[server]: ${envString} server is running at https://localhost:${PORT}`

app.listen(PORT, () => { console.log(serverStartMessage) })
