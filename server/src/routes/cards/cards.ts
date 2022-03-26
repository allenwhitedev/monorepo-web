import express from "express"
import { collections } from "../../db"

export async function cardAddRoute(req: express.Request, res: express.Response) {
  const {
    description,
    idsDeck,
    image,
    name,
  } = req.body
  const idUser = 'get-this-from-auth'
  const result = await cardAdd(description, idsDeck, idUser, image, name)
  return result.result
}

export async function cardAdd(description: string, idsDeck: string[], idUser: string, image: string, name: string) {
  const result = await collections.cards.insertOne({
    description,
    idsChoice: [],
    idsDeck,
    idUser,
    image,
    name, 
  })
  return result
}

async function cardsForDeck(idDeck: string) {
  const deck = await collections.decks.findOne({id: idDeck})
  const cards = await collections.cards.find({
    id: {$in: deck?.idsCard}
  })
  return cards
}