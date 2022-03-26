import { connectToDatabase } from "../../db";
import { deckAdd } from "./decks"

describe('routes/decks', function() {
  beforeAll(async () => {
    await connectToDatabase()
  });
  
  test('deckAdd', async function() {
    const idUser = 'user0'
    const name = 'Deck 0'
    const res = await deckAdd(idUser, name)
    expect(res.result.ok).toBeTruthy()
  })

})