import { combineReducers } from "redux";
import { ICommunicationEntity } from "../models/ICommunicationEntity";
import { State } from "../shared-server/models/State";
import { TestEntity } from "../shared-server/models/TestEntity";
import { communicationInitialState, communicationReducer } from "./communication/reducers";
import { testEntityInitialState, testEntityReducer } from "./data/testEntity/reducers";

export interface RootState { // redux state shape
  communication: State<ICommunicationEntity>
  // control: {}
  data: {
    testEntity: State<TestEntity>
  }
  // location: {}  
  // session: {}
}

export const reduxStateInitial: RootState = { // redux initial state
  communication: communicationInitialState,
  // control: {},
  data: {
    testEntity: testEntityInitialState,
  },
  // location: {},
  // session: {},
}


export const rootReducer = combineReducers({
  // TODO: add reducers for 5 types of react state (communication, control, location, session remain)
  communication: communicationReducer,
  // control: 
  data: combineReducers({
    testEntity: testEntityReducer
  }),
  // location: 
  // session
})
// export const rootReducer = combineReducers({
//   communication: {},
//   control: {},
//   data: {},
//   location: {},
//   session: {},
// })