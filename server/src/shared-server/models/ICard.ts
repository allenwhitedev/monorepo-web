export interface ICard {
  description: string
  id?: string // ~ primary key // ***FIX-THIS-BEFORE-COMMIT -> figure out mongo _id so we don't always map this
  idsChoice: string[] // ~ foreign keys
  idsDeck: string[] // ~ foreign keys
  idUser: string // ~ foreign key
  image: string
  name: string
}