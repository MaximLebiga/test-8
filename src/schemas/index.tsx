import * as yup from 'yup'
import { mapValues } from 'lodash'

export const formInfoSchema = yup.object().shape(
  {
    name: yup.string().required('Name is required'),
    from: yup.string().when('to', {
      is: (to: string) => to,
      then: yup.string().notRequired(),
      otherwise: yup
        .string()
        .nullable(true)
        .transform((_, val) => (typeof val === 'string' ? val : null))
        .required('Fill in at least one field')
    }),
    to: yup.string().when('from', {
      is: (from: string) => from,
      then: yup.string().notRequired(),
      otherwise: yup
        .string()
        .nullable(true)
        .transform((_, val) => (typeof val === 'string' ? val : null))
        .required('Fill in at least one field')
    }),
    table: yup.lazy((obj) =>
      yup.object(
        mapValues(obj, (_, key) => {
          if (key === 'main') {
            return yup.object({
              name: yup.string().required('This row is required'),
              age: yup.string().required('This row is required'),
              address: yup.string().required('This row is required')
            })
          }
          return yup.object().shape(
            {
              name: yup.string().when(['age', 'address'], {
                is: (age: string, address: string) => age || address,
                then: yup.string().required('This row is required'),
                otherwise: yup.string().notRequired()
              }),
              age: yup.string().when(['name', 'address'], {
                is: (name: string, address: string) => name || address,
                then: yup.string().required('This row is required'),
                otherwise: yup.string().notRequired()
              }),
              address: yup.string().when(['name', 'age'], {
                is: (name: string, age: string) => name || age,
                then: yup.string().required('This row is required'),
                otherwise: yup.string().notRequired()
              })
            },
            [
              ['age', 'address'],
              ['name', 'address'],
              ['name', 'age']
            ]
          )
        })
      )
    )
  },
  [['to', 'from']]
)
