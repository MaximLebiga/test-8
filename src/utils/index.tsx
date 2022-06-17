import { v1 as uuidv1 } from 'uuid'
import FormSelectWithSearch from '../components/FormSelectWithSearch/FormSelectWithSearch'
import { values } from "../MockData"
import FormInput from '../components/FormInput/FormInput'
import { createFormTableRowType } from '../types'
import style from "./row.module.css"

 export const createFormTableRow = ({
   control,
   main,
   setError,
   clearErrors,
   getValues,
   handleButtonDeleteClick
 }: createFormTableRowType) => {
   const id = main ? 'main' : uuidv1()

   const handleBlurTable = (
     value: string,
     name: 'name' | 'from' | 'to' | 'table' | `table.${string}`,
     id?: string
   ) => {
     if (value) {
       clearErrors(name)
       return
     }
     
     if (!name.includes('main')) {
       const data = getValues(`table.${id}`)
       if (data.age || data.address || data.name) {
         setError(name, {
           type: name,
           message: 'This row is required'
         })
       } else {
         clearErrors([
           `table.${id}.name`,
           `table.${id}.age`,
           `table.${id}.address`
         ])
       }
     } else {
       setError(name, {
         type: name,
         message: 'This row is required'
       })
     }
   }

   return {
     key: id,
     name: (
       <FormSelectWithSearch
         control={control}
         options={values}
         name={`table.${id}.name`}
         id={id}
         handleBlur={handleBlurTable}
       />
     ),
     age: (
       <FormInput
         id={id}
         name={`table.${id}.age`}
         control={control}
         handleBlur={handleBlurTable}
         placeholder="age"
         type="number"
       />
     ),
     address: (
       <FormInput
         id={id}
         name={`table.${id}.address`}
         control={control}
         handleBlur={handleBlurTable}
         placeholder="address"
         type="text"
       />
     ),
     action: id !== 'main' && (
       <button
         type="button"
         onClick={() => handleButtonDeleteClick(id)}
         className={style.button}
       >
         Delete
       </button>
     )
   }
 }
