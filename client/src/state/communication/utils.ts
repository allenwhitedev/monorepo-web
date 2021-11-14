import moment from "moment";
import { CommunicationStatus } from "../../constants/CommunicationStatus";
import { ICommunicationEntity } from "../../models/ICommunicationEntity";

export function communicationEntityGen(id: string, actionType: string, entityInCurrentState?: ICommunicationEntity): ICommunicationEntity { // # generate communication entity for communication reducer
  const communicationType = actionType.substring(id.length) // returns '' / _FAIL / _SUCCESS
  return {
    ...entityInCurrentState,
    id,
    ...communicationPartials[communicationType] || {} // this fallback should never be needed if action types are named properly using _FETCH + _FETCH_FAIL + _FETCH_SUCCESS
  }
}
const communicationPartials: {[id: string]: {status: CommunicationStatus, start?: moment.Moment, finish?: moment.Moment}} = {
  '': {start: moment(), status: 'Pending'},
  '_FAIL': {finish: moment(), status: 'Fail'},
  '_SUCCESS': {finish: moment(), status: 'Success'}
}
