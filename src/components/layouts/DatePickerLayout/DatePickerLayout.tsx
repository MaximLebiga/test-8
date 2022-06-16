import { DatePicker } from "antd"
import { FC } from "react"
import { Controller } from "react-hook-form"
import { DatePickerProps } from "../../../interfaces"

const DatePickerLayout: FC<DatePickerProps> = ({ control, name, check, setError, clearErrors, getValues }) => {
  
  const handleBlur = () => {
    if (!getValues()[check] && !getValues()[name]) {
      setError('to', {
        type: 'date',
        message: 'Fill in at least one field'
      })
      return
    }
    clearErrors('to')
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <DatePicker
          onChange={(value: any) => onChange(value._d)}
          onBlur={handleBlur}
        />
      )}
    />
  )
}

export default DatePickerLayout