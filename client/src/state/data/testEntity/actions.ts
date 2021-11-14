import { State } from "../../../shared-server/models/State"
import { TestEntity } from "../../../shared-server/models/TestEntity"
import { testEntityActionTypes as types } from "./types"

interface TestEntityFetch {
  type: types.TEST_ENTITY_FETCH
}
export const testEntityFetch = (): TestEntityFetch => ({
  type: types.TEST_ENTITY_FETCH
})

interface TestEntityFetchFail {
  error: any
  type: types.TEST_ENTITY_FETCH_FAIL
}
export const testEntityFetchFail = (error: any): TestEntityFetchFail => ({
  error, 
  type: types.TEST_ENTITY_FETCH_FAIL
})

interface TestEntityFetchSuccess {
  state: State<TestEntity>
  type: types.TEST_ENTITY_FETCH_SUCCESS
}
export const testEntityFetchSuccess = (state: State<TestEntity>): TestEntityFetchSuccess => ({
  state, 
  type: types.TEST_ENTITY_FETCH_SUCCESS
})

export type TestEntityAction = 
  TestEntityFetch
| TestEntityFetchFail
| TestEntityFetchSuccess