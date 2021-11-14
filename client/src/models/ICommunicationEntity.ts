import moment from "moment";
import { CommunicationStatus } from "../constants/CommunicationStatus";

export interface ICommunicationEntity {
  finish?: moment.Moment
  id: string
  start?: moment.Moment
  status?: CommunicationStatus
}