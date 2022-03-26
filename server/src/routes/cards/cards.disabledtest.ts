import { connectToDatabase } from "../../db";
import { cardAdd } from "./cards"

describe('routes/cards', function() {
  // beforeAll(async () => {
  //   await connectToDatabase()
  // });

  test('cardAdd', async function() {
    const description = 'Two interns blah blah blah...'
    const idsDeck = ['Deck 0'] 
    const idUser = 'user0'
    const image = 'https://www.google.com/logos/doodles/blahblah.gif'
    const name = 'Google Movie'
    await connectToDatabase()

    const result = await cardAdd(description, idsDeck, idUser, image, name)
    expect(result.result.ok).toBeTruthy()
  })

})