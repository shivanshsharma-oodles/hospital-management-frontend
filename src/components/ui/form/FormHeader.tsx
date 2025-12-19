import React from "react"
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { FormHeaderProps } from "@/types"



const FormHeader = ({ title, description, action }: FormHeaderProps) => {
  return (
    <CardHeader>
      
      <div>
        <CardTitle>{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </div>

      {action && (
        <div data-slot="card-action">
          {action}
        </div>
      )}
    </CardHeader>
  )
}

export default FormHeader
