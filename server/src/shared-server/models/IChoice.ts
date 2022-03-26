export interface IChoice {
  id?: string // ~ primary key // ***FIX-THIS-BEFORE-COMMIT -> figure out mongo _id so we don't always map this
  idUser: string // ~ foreign key
  idCard: string // ~ foreign key
  isLiked: boolean // ~ foreign key
  isSuperLiked?: boolean // ~ foreign key
}