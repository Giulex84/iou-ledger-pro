export type IOUType = "owed" | "owing" // "owed" = they owe me, "owing" = I owe them

export type IOUCurrency = "EUR" | "USD" | "PI"

export interface IOU {
  id: string
  name: string
  amount: number
  date: string
  paid: boolean
  type: IOUType
  category: string
  currency: IOUCurrency
}
