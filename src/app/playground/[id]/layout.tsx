import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar';
function PlaygroundLayout({
    children,
}:{
    children:React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
        {children}
    </SidebarProvider>
  )
}

export default PlaygroundLayout
