import { Input } from "antd";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../interfaces";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import style from "./FormInput.module.css"

const FormInput: FC<FormInputProps> = ({
  id,
  name,
  control,
  handleBlur,
  placeholder,
  type
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, name, onChange }, fieldState: { error } }) => (
        <>
          <Input
            placeholder={placeholder}
            onChange={onChange}
            onBlur={() => handleBlur(value, name, id)}
            type={type}
            status={error?.message && 'error'}
            min={type === 'number' ? 1 : undefined}
            className={style.input}
          />
          {error?.message && <ErrorMessage error={error?.message} />}
        </>
      )}
    />
  )
}

export default FormInput