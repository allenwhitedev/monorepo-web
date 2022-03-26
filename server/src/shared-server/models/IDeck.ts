export interface IDeck {
  id?: string // ~ primary key // ***FIX-THIS-BEFORE-COMMIT -> figure out mongo _id so we don't always map this
  idsCard: string[] // ~ foreign keys
  idsUser: string[] // ~ foreign keys
  name: string
}