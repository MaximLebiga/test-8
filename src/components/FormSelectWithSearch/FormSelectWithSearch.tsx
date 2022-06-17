import { Select } from "antd"
import { FC } from "react"
import { Controller } from "react-hook-form"
import { FormSelectWithSearchProps } from '../../interfaces'
import { NameType } from "../../types"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"

const FormSelectWithSearch: FC<FormSelectWithSearchProps> = ({
  options,
  control,
  name,
  id,
  setError,
  handleBlur
}) => {


  const handleBlurSelect = (
    value: string,
    name: NameType
  ) => {
    if (!value) {
      if (setError) {
        setError(name, {
        type: name,
        message: 'Name is required'
      })
      }
      return
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field: { value, name, onChange }, fieldState: { error } }) => (
        <>
          <Select
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
            onBlur={() =>
              handleBlur
                ? handleBlur(value, name, id)
                : handleBlurSelect(value, name)
            }
            onChange={onChange}
            status={error?.message && 'error'}
          >
            {options.map((option) => (
              <Select.Option key={option}>{option}</Select.Option>
            ))}
          </Select>
          {error?.message && <ErrorMessage error={error?.message} />}
        </>
      )}
    />
  )
}

export default FormSelectWithSearch