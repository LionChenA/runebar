import { Link, useRouter } from "@tanstack/react-router"
import { BrainCircuit, FlaskRound, LayoutDashboard, Settings, Terminal } from "lucide-react"
import React, { useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"

export default function AppSidebar() {
  const router = useRouter()
  const currentPath = router.state.location.pathname

  // 添加快捷键监听 Cmd+, 打开设置页面
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === ",") {
        event.preventDefault()
        router.navigate({ to: "/settings" })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router])

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
      <SidebarFooter className="px-2 pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/settings" className="w-full">
              <SidebarMenuButton
                isActive={currentPath === "/settings"}
                className="w-full"
                size="default"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
