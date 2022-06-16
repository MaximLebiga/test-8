import { Form, Table } from "antd";
import { FC, useEffect, useState } from "react";
import SelectWithSearchLayout from "../layouts/SelectWithSearchLayout/SelectWithSearchLayout";
import { FormValues } from '../../interfaces'
import { useForm} from "react-hook-form";
import { columns, values } from "../../MockData";
import { createError } from "../../utils";
import DatePickerLayout from "../layouts/DatePickerLayout/DatePickerLayout";
import { yupResolver } from '@hookform/resolvers/yup'
import { formInfoSchema } from "../../schemas";
import RowLayout from "../layouts/RowLayout/RowLayout";

const FormInfo: FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(formInfoSchema)
  })
  const [data, setData] = useState([
    RowLayout({
      control,
      main: true,
      setError,
      clearErrors,
      getValues,
      errors,
    })  
  ])

  useEffect(() => {console.log(data)}, [errors, data])
  
  return (
    <Form
      labelCol={{
        span: 4
      }}
      wrapperCol={{
        span: 14
      }}
      layout="horizontal"
      size="middle"
      onFinish={handleSubmit((data) => {
        console.log(data)
      })}
    >
      <Form.Item label="Name">
        <SelectWithSearchLayout
          options={values}
          control={control}
          name="name"
          errors={[errors['name']?.message]}
          setError={setError}
          clearErrors={clearErrors}
          getValues={getValues}
        />
      </Form.Item>
      <Form.Item label="From">
        <DatePickerLayout
          name="from"
          check="to"
          control={control}
          setError={setError}
          clearErrors={clearErrors}
          getValues={getValues}
        />
      </Form.Item>
      <Form.Item label="To">
        <DatePickerLayout
          name="to"
          check="from"
          control={control}
          setError={setError}
          clearErrors={clearErrors}
          getValues={getValues}
        />
        {createError([errors.to?.message])}
      </Form.Item>
      <Form.Item>
        <Table columns={columns} dataSource={data} pagination={false} />
        <button
          type="button"
          onClick={() => {
            setData((prevState) => [...prevState, RowLayout({ control, main: false, errors })])
          }}
        >
          Add raw
        </button>
      </Form.Item>
      <button type="submit">Submit</button>
    </Form>
  )
}

export default FormInfo