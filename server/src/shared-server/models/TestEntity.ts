import moment from "moment";
import { Modify } from "../utils";

export type TestEntity = Modify<TestEntityC, {
  id: string
  name: string
  createdAt: moment.Moment
}>

export interface TestEntityC {
  _id: string
  name: string
  createdAt: string //~ moment
}

export function TestEntityCToModel(contract: TestEntityC): TestEntity { // contract -> model mapper, mutates contract to model shape, bypass typical typescript here to avoid copying objects
  contract.createdAt = moment(contract.createdAt) as unknown as string // best known way to bypass typescript to map from one type to another without copying object
  (contract as unknown as TestEntity).id = contract._id
  delete (contract as any)._id
  return contract as unknown as TestEntity
}