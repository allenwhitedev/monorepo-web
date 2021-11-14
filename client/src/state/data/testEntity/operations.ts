import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { DEFAULT_HEADERS } from "../../../constants/DEFAULT_HEADERS"
import { API_URL } from "../../../shared-server/constants/API_URL"
import { TestEntity, TestEntityC, TestEntityCToModel } from "../../../shared-server/models/TestEntity"
import { tryCatchPromise } from "../../../utils"
import { RootState } from "../../rootReducer"
import { arrayToStateMapper } from "../../utils"
import { testEntityFetch, testEntityFetchFail, testEntityFetchSuccess } from "./actions"

// example fetch using monads and mappers
export const testEntityFetchThunk = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {

  dispatch(testEntityFetch())
  const [testEntitiesResultC, error] = await tryCatchPromise(dispatch)<TestEntityC[]>(testEntityFetchOp)
  if (error)
    return dispatch(testEntityFetchFail(error))
  
  const testEntityState = arrayToStateMapper<TestEntityC, TestEntity>(testEntitiesResultC!, TestEntityCToModel)
  await dispatch(testEntityFetchSuccess(testEntityState))
  return Promise.resolve()
}
async function testEntityFetchOp() {
  const url = `${API_URL}/testEntity`
  const resp = await fetch(url, {
    headers: DEFAULT_HEADERS,
  })
  if (resp.ok) 
    return resp.json()
  else 
    throw new Error(`Fetch failure from testEntityFetchOp(). Response from '${url}': ${JSON.stringify(resp)}`)
}