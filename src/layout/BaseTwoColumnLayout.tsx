import React from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

interface BaseTwoColumnLayoutProps {
  LeftComponent?: React.ReactNode
  RightComponent?: React.ReactNode
  resize?: boolean
  minSize?: number
  maxSize?: number
  className?: string
}

export default function BaseTwoColumnLayout({
  LeftComponent,
  RightComponent,
  resize= false, 
  minSize,
  maxSize,
  className = ""
}: BaseTwoColumnLayoutProps) {
  return (
      <ResizablePanelGroup
        orientation="horizontal"
        className="h-screen flex-1 w-full"
      >
        {/* LEFT PANEL (Sidebar) */}
        <ResizablePanel defaultSize={20} minSize={!resize ? 200 : minSize} maxSize={!resize ? 200 : maxSize }>
          <div className="h-full bg-muted/30 border-r">
            {LeftComponent ? (
              LeftComponent
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                Sidebar content here
              </div>
            )}
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* RIGHT PANEL (Main content) */}
        <ResizablePanel defaultSize={80} minSize={30}>
          <div className="h-full p-4 overflow-auto">
            {RightComponent ? (
              RightComponent
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                Main content here
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
  )
}