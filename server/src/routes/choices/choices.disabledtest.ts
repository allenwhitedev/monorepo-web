import { connectToDatabase } from "../../db";
import { choiceAdd } from "./choices"

describe('routes/choices', function() {
  beforeAll(async () => {
    await connectToDatabase()
  });

  test('choiceAdd', async function() {
    const idCard = 'Google Movie' 
    const idUser = 'user0'
    const isLiked = true
    
    const res = await choiceAdd(idCard, idUser, isLiked)
    expect(res.result.ok).toBeTruthy()
  })

})