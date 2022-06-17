import { Control, FieldError, UseFormClearErrors, UseFormGetValues, UseFormSetError } from "react-hook-form"

export type createFormTableRowType = {
  control: Control<FormValues>
  main: boolean
  setError: UseFormSetError<FormValues>
  clearErrors: UseFormClearErrors<FormValues>
  getValues: UseFormGetValues<FormValues>
  errors?: {
    name?: FieldError | undefined
    from?: FieldError | undefined
    to?: FieldError | undefined
    table?:
      | {
          [x: string]: {
            name?: FieldError | undefined
            age?: FieldError | undefined
            address?: FieldError | undefined
          }
        }
      | undefined
  }
  handleButtonDeleteClick: (id: string) => void
}

export type FormValues = {
  name: string | undefined
  from: string | undefined
  to: string | undefined
  table: {
    [key: string]: {
      name: string | undefined
      age: string | undefined
      address: string | undefined
    }
  }
}

export type NameType = 'name' | `table.${string}` | 'table' | 'from' | 'to'