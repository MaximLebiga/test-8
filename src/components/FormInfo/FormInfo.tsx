import { Form, Table } from 'antd'
import 'antd/dist/antd.css'
import { FC, useState } from 'react'
import SelectWithSearchLayout from "../FormSelectWithSearch/FormSelectWithSearch";
import { useForm} from "react-hook-form";
import { columns, values } from "../../MockData";
import FormDatePicker from '../FormDatePicker/FormDatePicker'
import { yupResolver } from '@hookform/resolvers/yup'
import { formInfoSchema } from "../../schemas";
import { createFormTableRow } from '../../utils';
import { FormValues } from '../../types';
import style from "./FormInfo.module.css"

const FormInfo: FC = () => {
  const [submitStatus, setSubmitStatus] = useState(false)
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    unregister,
  } = useForm<FormValues>({
    resolver: yupResolver(formInfoSchema)
  })
  const [data, setData] = useState([
    createFormTableRow({
      control,
      main: true,
      setError,
      clearErrors,
      getValues,
      handleButtonDeleteClick
    })
  ])

  const handleSubmitForm = (data: FormValues) => {
    const tableKeys = Object.keys(data.table)
    for (const key of tableKeys) {
      if (!data.table[key].name) {
        delete data.table[key]
      }
    }
    console.log(data)
    setSubmitStatus(prevState => !prevState)
  }


 function handleButtonDeleteClick (id: string) {
   setData((prevState) => prevState.filter((data) => data.key !== id))
   unregister(`table.${id}`)
  }
  
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
      onFinish={handleSubmit(handleSubmitForm)}
      className={style.form}
    >
      <Form.Item label="Name" className={style.form_item}>
        <SelectWithSearchLayout
          options={values}
          control={control}
          name="name"
          setError={setError}
        />
      </Form.Item>
      <Form.Item label="From" className={style.form_item}>
        <FormDatePicker
          name="from"
          check="to"
          control={control}
          setError={setError}
          clearErrors={clearErrors}
          getValues={getValues}
        />
      </Form.Item>
      <Form.Item label="To" className={style.form_item}>
        <FormDatePicker
          name="to"
          check="from"
          control={control}
          setError={setError}
          clearErrors={clearErrors}
          getValues={getValues}
        />
      </Form.Item>
      <Form.Item className={style.table}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />
        <button
          type="button"
          onClick={() => {
            setData((prevState) => [
              ...prevState,
              createFormTableRow({
                control,
                main: false,
                setError,
                clearErrors,
                getValues,
                handleButtonDeleteClick
              })
            ])
          }}
          className={style.button}
        >
          Add raw
        </button>
      </Form.Item>
      <button type="submit" className={style.button}>
        Submit
      </button>
      {submitStatus && <p>Success</p>}
    </Form>
  )
}

export default FormInfo