import { Select } from "antd"
import 'antd/dist/antd.css'
import { FC } from "react"
import { Controller } from "react-hook-form"
import { SelectWithSearchLayoutProps } from '../../../interfaces'
import { createError } from "../../../utils"

const SelectWithSearchLayout: FC<SelectWithSearchLayoutProps> = ({
  options, control, name, errors, setError, clearErrors, getValues
}) => {

  const handleBlur = () => {
    if (getValues) {
      if (!getValues()[name]) {
        setError(name, {
          type: name,
          message: "Name is required"
        })
        return
      }
      clearErrors(name)
    }
  }

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Search to Select"
            showSearch
            style={{
              width: 200
            }}
            optionFilterProp="children"
            filterOption={(input: string, option: any) =>
              option.children.includes(input)
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            onBlur={handleBlur}
          >
            {options.map((option) => (
              <Select.Option key={option}>{option}</Select.Option>
            ))}
          </Select>
        )}
      />
      {createError(errors || [undefined])}
    </>
  )
}

export default SelectWithSearchLayout