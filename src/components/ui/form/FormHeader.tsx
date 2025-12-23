import React from "react"
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { FormHeaderProps } from "@/types"



const FormHeader = ({ title, description, action }: FormHeaderProps) => {
  return (    
    <CardHeader>
      
      <div className="my-4">
        <CardTitle>{title}</CardTitle>
        {description && (
          <CardDescription className="mt-3">{description}</CardDescription>
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
