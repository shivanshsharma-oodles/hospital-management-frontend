import { CardFooter } from "@/components/ui/card"
import type { FormFooterProps } from "@/types"
import React from "react"



const FormFooter = ({ children }: FormFooterProps) => {
  return (
    <CardFooter className="flex flex-col justify-end gap-2">
      {children}
    </CardFooter>
  )
}

export default FormFooter
