export interface IErrors<ErrorT> {
  [key: string]: ErrorT
}

export declare class Form<DataT, ErrorT = string[]> {
  public unknownError: string
  public errors: IErrors<ErrorT>
  public data: DataT

  public constructor(initialData: DataT)

  public hasErrors: boolean
  public hasUnknownError: boolean

  public clearErrors(): void
  public addErrors(errors: IErrors<ErrorT> | string): void
}
