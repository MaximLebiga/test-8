import { Control, UseFormClearErrors, UseFormGetValues, UseFormSetError } from "react-hook-form"
import { FormValues, NameType } from "../types"

export interface FormSelectWithSearchProps {
  options: string[]
  name: NameType
  control: Control<FormValues> | any
  id?: string
  handleBlur?: (value: string, name: NameType, id?: string) => void
  setError?: UseFormSetError<FormValues>
}

export interface FormDatePickerProps {
  control: Control<FormValues> | any
  name: NameType
  check: NameType
  setError: UseFormSetError<FormValues>
  clearErrors: UseFormClearErrors<FormValues>
  getValues: UseFormGetValues<FormValues>
}

export interface FormInputProps {
  id: string
  name: NameType
  control: Control<FormValues>
  handleBlur: (
    value: string | any,
    name: NameType,
    id?: string
  ) => void
  placeholder: string
  type: string
}

export interface ErrorMessageProps {
 error: string
}