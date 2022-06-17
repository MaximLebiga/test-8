import { FC } from "react";
import { ErrorMessageProps } from "../../interfaces";
import style from "./ErrorMessage.module.css"

export const ErrorMessage: FC<ErrorMessageProps> = ({error}) => {
  return <p className={style.text}>{error}</p>
}