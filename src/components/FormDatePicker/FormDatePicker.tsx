import { DatePicker } from "antd"
import moment from "moment"
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

  const disableDate = (current: any) => {
    const date = getValues(check)
    const currentDate = moment().endOf('day')
    if (date && check === 'to') {
      return current > date ||  current < currentDate
    }

    if (date && check === 'from') {
      return current < date
    }

    return current < currentDate || current === currentDate
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, name, value }, fieldState: { error } }) => (
        <>
          <DatePicker
            format="YYYY-MM-DD"
            onChange={onChange}
            status={error?.message && 'error'}
            onBlur={() => handleBlur(name, value)}
            disabledDate={disableDate}
          />
          {error?.message && <ErrorMessage error={error?.message} />}
        </>
      )}
    />
  )
}

export default FormDatePicker