
export interface SelectWithSearchLayoutProps {
  options: string[]
  name: string
  control: any
  errors?: Array<string | undefined>
  setError?: any
  clearErrors?: any
  getValues?: any
}

export interface FormValues {
  name: string
  from: string
  to: string
  table: {
    [key: string]: {
      name: string
      age: string
      address: string
    }
  }
}

export interface DatePickerProps {
  control: any
  name: string
  check: string
  setError: any
  clearErrors: any
  getValues: any
}