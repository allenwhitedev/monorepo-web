import { State } from "../../../shared-server/models/State"
import { TestEntity } from "../../../shared-server/models/TestEntity"
import { TestEntityAction } from "./actions"
import { testEntityActionTypes as types } from "./types"

export const testEntityInitialState: State<TestEntity> = {allIds: [], byId: {}}
export function testEntityReducer(state: State<TestEntity> = testEntityInitialState, action: TestEntityAction) {
  switch (action.type) {

    case types.TEST_ENTITY_FETCH_SUCCESS:
      return action.state

    default:
      return state
  }
}