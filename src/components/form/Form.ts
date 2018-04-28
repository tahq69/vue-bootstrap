interface IErrors<ErrorT> {
  [key: string]: ErrorT
}

export class Form<DataT, ErrorT = string[]> {
  public unknownError: string = ""
  public errors: IErrors<ErrorT>
  public data: DataT

  public constructor(initialData: DataT) {
    this.data = initialData
    this.errors = {}
  }

  public get hasErrors() {
    return Object.keys(this.errors).length > 0 || this.hasUnknownError
  }

  public get hasUnknownError() {
    return this.unknownError !== ""
  }

  public clearErrors() {
    this.unknownError = ""
    this.errors = {}
  }

  public addErrors(errors: IErrors<ErrorT> | string) {
    if (errors instanceof Error) throw errors

    if (typeof errors === "string") {
      this.unknownError = errors
      return
    }

    if (!errors) return

    this.errors = errors
  }
}
