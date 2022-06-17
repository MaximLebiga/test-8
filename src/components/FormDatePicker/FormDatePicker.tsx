import { DatePicker } from "antd"
import { FC } from "react"
import { Controller } from "react-hook-form"
import { FormDatePickerProps } from '../../interfaces'
import { NameType } from "../../types"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"

const FormDatePicker: FC<FormDatePickerProps> = ({
  control,
  name,
  check,
  setError,
  clearErrors,
  getValues
}) => {
  const handleBlur = (name: NameType, value: string) => {
    if (!getValues(check) && !value) {
      setError(name, {
        type: 'date',
        message: 'Fill in at least one field'
      })
      return
    }
    clearErrors(name)
    clearErrors(check)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, name, value }, fieldState: { error } }) => (
        <>
          <DatePicker
            onChange={onChange}
            status={error?.message && 'error'}
            onBlur={() => handleBlur(name, value)}
          />
          {error?.message && <ErrorMessage error={error?.message} />}
        </>
      )}
    />
  )
}

export default FormDatePicker