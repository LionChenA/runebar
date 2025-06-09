import { Link, useRouter } from "@tanstack/react-router"
import { BrainCircuit, FlaskRound, LayoutDashboard, Terminal } from "lucide-react"
import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../ui/sidebar"

export default function AppSidebar() {
  const router = useRouter()
  const currentPath = router.state.location.pathname

  // 定义导航项
  const navItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Tools",
      path: "/tools",
    },
    {
      icon: <Terminal className="h-5 w-5" />,
      label: "Prompt",
      path: "/prompt",
    },
    {
      icon: <BrainCircuit className="h-5 w-5" />,
      label: "Models",
      path: "/models",
    },
    {
      icon: <FlaskRound className="h-5 w-5" />,
      label: "Playground",
      path: "/playground",
    },
  ]

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar
        className="h-screen border-r pt-16"
        style={{
          width: "auto",
          minWidth: "12rem",
          maxWidth: "14rem",
        }}
        variant="inset"
        collapsible="none"
      >
        <SidebarContent className="px-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <Link to={item.path} className="w-full">
                  <SidebarMenuButton
                    isActive={currentPath === item.path}
                    className="w-full"
                    size="default"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
