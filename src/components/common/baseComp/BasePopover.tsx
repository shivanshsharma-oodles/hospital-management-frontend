import * as React from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

interface BasePopoverProps {
  /** The trigger element — e.g., button, avatar, icon, etc. */
  trigger: React.ReactNode
  content: React.ReactNode // The content inside popover — can be any JSX (buttons, list, etc.)
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

/**
 * BasePopover
 * ------------
 * A reusable, generic popover wrapper.
 * Provides trigger-content structure and customizable positioning.
 * Can be used anywhere — profile menu, settings, filters, etc.
 *
 * Example:
 *  <BasePopover
 *    trigger={<Button>Open</Button>}
 *    content={<div>Popover Content</div>}
 *  />
 */
export default function BasePopover({
  trigger,
  content,
  align = "center",
  side = "bottom",
  className = "w-auto p-2",
}: BasePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger className="" asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        className={`${className} bg-muted`}
      >
        {content}
      </PopoverContent>
    </Popover>
  )
}