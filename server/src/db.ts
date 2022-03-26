import { Collection, Db, MongoClient } from "mongodb";
import { ICard } from "./shared-server/models/ICard";
import { IChoice } from "./shared-server/models/IChoice";
import { IDeck } from "./shared-server/models/IDeck";
import { TestEntity } from "./shared-server/models/TestEntity";

// Global Variables
export const collections: {
  cards: Collection<ICard>, 
  choices: Collection<IChoice>,
  decks: Collection<IDeck>,  
  testEntities?: Collection<TestEntity> 
} = {
  cards: {} as Collection<ICard>,
  choices: {} as Collection<IChoice>,
  decks: {} as Collection<IDeck>,
}

// Initialize Connection
// - initialize mongo db client
export async function connectToDatabase () {

  const client: MongoClient = new MongoClient('mongodb://localhost:27017/yayornay');
          
  await client.connect();
      
  const db: Db = client.db('yayornayDb');
 
  const testEntitiesCollection: Collection = db.collection('testEntities');

  collections.testEntities = testEntitiesCollection;
     
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${testEntitiesCollection.collectionName}`);
}