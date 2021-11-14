import { COMMUNICATION_KEYS } from "../../constants/COMMUNICATION_KEYS"
import { ICommunicationEntity } from "../../models/ICommunicationEntity"
import { State } from "../../shared-server/models/State"
import { stateAddItemWithoutMutation } from "../utils"
import { communicationEntityGen } from "./utils"

export const communicationInitialState: State<ICommunicationEntity> = {allIds: [], byId: {}}

export function communicationReducer(state: State<ICommunicationEntity> = communicationInitialState, action: {type: string}) {
  const indexOfFetch = action.type.indexOf('_FETCH')
  const id = action.type.substring(0, indexOfFetch + '_FETCH'.length)
  const isCommunicationAction = COMMUNICATION_KEYS.has(id)

  if (isCommunicationAction) {
    const communicationEntity = state.byId[id] // possibly undefined
    const nextCommunicationEntity = communicationEntityGen(id, action.type, communicationEntity)
    
    const newState = stateAddItemWithoutMutation(state, nextCommunicationEntity)
    return newState
  }

  return state
}