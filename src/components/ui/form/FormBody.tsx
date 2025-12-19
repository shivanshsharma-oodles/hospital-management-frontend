import { CardContent } from "@/components/ui/card"
import type { FormBodyProps } from "@/types"
import React from "react"


const FormBody = ({ children }: FormBodyProps) => {
  return (
    <CardContent className="flex flex-col gap-4">
      {children}
    </CardContent>
  )
}

export default FormBody
