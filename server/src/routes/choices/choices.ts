import { collections } from "../../db";

export async function choiceAdd(idCard: string, idUser: string, isLiked: boolean, isSuperLiked?: boolean) {
  const result = collections.choices.insertOne({
    idCard,
    idUser,
    isLiked,
    ...(isSuperLiked ? {isSuperLiked} : {}),
  })
  return result
}

export async function choicesForCard(idCard: string) {
  const card = await collections.cards.findOne({id: idCard})
  const choices = await collections.choices.find({
    id: {$in: card?.idsChoice}
  })
  return choices
}