import * as yup from 'yup'
import { mapValues } from 'lodash'

export const formInfoSchema = yup.object().shape(
  {
    name: yup.string().required('Name is required'),
    from: yup.string().when('to', {
      is: (to: string) => to,
      then: yup.string().notRequired(),
      otherwise: yup.string().required('Fill in at least one field')
    }),
    to: yup.string().when('from', {
      is: (from: string) => from,
      then: yup.string().notRequired(),
      otherwise: yup.string().required('Fill in at least one field')
    }),
    table: yup.lazy((obj) =>
      yup.object(
        mapValues(obj, (_, key) => {
          if (key === "main") {
            return yup.object({
              name: yup.string().required('This raw is required'),
                    age: yup.string().required('This raw is required'),
                    address: yup.string().required('This raw is required')
            })
          }

          return yup.object({
              name: yup.string().required('This raw is required'),
              age: yup.string().required('This raw is required'),
              address: yup.string().required('This raw is required')
            })
        })
      )
    )
  },
  [['to', 'from']]
)
