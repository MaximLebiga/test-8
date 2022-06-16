import Input from 'antd/lib/input/Input'
import {
  Control,
  Controller,
  UseFormSetError,
  UseFormClearErrors,
  UseFormGetValues,
  FieldError
} from 'react-hook-form'
import { v1 as uuidv1 } from 'uuid'
import SelectWithSearchLayout from '../SelectWithSearchLayout/SelectWithSearchLayout'
import { values } from '../../../MockData'
import { FormValues } from '../../../interfaces'
import { createError } from '../../../utils'

interface RowLayoutProps {
  control: Control<FormValues>
  main: boolean
  setError?: UseFormSetError<FormValues>
  clearErrors?: UseFormClearErrors<FormValues>
  getValues?: UseFormGetValues<FormValues>
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
}
function RowLayout({
  control,
  main,
  setError,
  clearErrors,
  getValues,
  errors
}: RowLayoutProps) {
  const key = main ? 'main' : uuidv1()

  return {
    key: key,
    name: (
      <SelectWithSearchLayout
        control={control}
        options={values}
        name={`table.${key}.name`}
        setError={setError}
        clearErrors={clearErrors}
        getValues={getValues}
        errors={[
          errors && errors['table']?.[key]
            ? errors['table']?.[key].name?.message
            : undefined
        ]}
      />
    ),
    age: (
      <>
        <Controller
          name={`table.${key}.age`}
          defaultValue=""
          control={control}
          render={({ field }) => <Input {...field} placeholder="age" />}
        />
        {createError([
          errors && errors['table']?.[key]
            ? errors['table']?.[key].age?.message
            : undefined
        ])}
      </>
    ),
    address: (
      <>
        <Controller
          name={`table.${key}.address`}
          defaultValue=""
          control={control}
          render={({ field }) => <Input {...field} placeholder="address" />}
        />
        {createError([
          errors && errors['table']?.[key]
            ? errors['table']?.[key].address?.message
            : undefined
        ])}
      </>
    )
  }
}

export default RowLayout
