import * as React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { BaseFormProps } from "@/types"



const BaseForm = ({ className, children, ...props }: BaseFormProps) => {
  return (
    <Card className={cn(" w-full", className)}>
      <form
        className="my-2 flex flex-col gap-6"
        {...props}
      >
        {children}
      </form>
    </Card>
  )
}

export default BaseForm;
