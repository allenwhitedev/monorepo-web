import { collections } from "../../db";

export async function deckAdd(idUser: string, name: string) {
  const result = await collections.decks.insertOne({
    idsCard: [],
    idsUser: [idUser],
    name,
  })
  return result
}