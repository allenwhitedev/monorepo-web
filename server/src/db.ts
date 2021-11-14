import { Collection, Db, MongoClient } from "mongodb";
import { TestEntity } from "./shared-server/models/TestEntity";

// Global Variables
export const collections: { testEntities?: Collection<TestEntity> } = {}

// Initialize Connection
// - initialize mongo db client
export async function connectToDatabase () {

  const client: MongoClient = new MongoClient('mongodb://localhost:27017/monorepo');
          
  await client.connect();
      
  const db: Db = client.db('testEntitiesDb');
 
  const testEntitiesCollection: Collection = db.collection('testEntities');

  collections.testEntities = testEntitiesCollection;
     
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${testEntitiesCollection.collectionName}`);
}