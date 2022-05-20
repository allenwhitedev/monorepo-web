import { collections } from "../../db";
import express from "express"

export async function deckAddRoute(req: express.Request, res: express.Response) {
  const idUser = 'get-this-from-auth'
  const result = await deckAdd(idUser, req.body.name)
  return result.result
}

async function deckAdd(idUser: string, name: string) {
  console.log(`collections: ${Object.keys(collections).join(', ')}`)
  // const result = await collections.decks.insertOne({
  //   idsCard: [],
  //   idsUser: [idUser],
  //   name,
  // })
  // return result
  return {result: 'TODO:'}
}