import { testEntityFetch } from "../data/testEntity/actions"
import { communicationInitialState, communicationReducer } from "./reducers"

describe('communication tests', function() {
  test('_FETCH actions update communication state thru reducer', async function() {
    const state = communicationReducer(communicationInitialState, {type: '@@redux/INIT'})
    const nextState = communicationReducer(state, testEntityFetch())
    const nextStateCommunicationEntity = nextState.byId['data/testEntity/TEST_ENTITY_FETCH']

    expect(state.allIds.length).toBeLessThan(nextState.allIds.length) // new id should be added
    expect(nextStateCommunicationEntity).toBeDefined()
    expect(nextStateCommunicationEntity.status === 'Pending')
  })
})
