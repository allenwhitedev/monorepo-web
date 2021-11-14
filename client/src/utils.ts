import { Dispatch } from "redux"

export const tryCatchPromise = (dispatch: Dispatch<any>, funcArgs?: any[]) => async function tryCatchPromise<T>(func: Function): Promise<[T | null, any | null]> { // will need a way to pass args
  try {
    const data = await (funcArgs ? func(...funcArgs as any[]) : func(funcArgs))
    return [data, null]
  } catch (error: any) {
    // dispatch(addToast({id: _.uniqueId("error-"), type: "Danger", description: "Request failed", title: "Error", backgroundColor: toastBGColorDict["Danger"]}))
    return [null, error]
  }
}