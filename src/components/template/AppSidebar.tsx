import { useSettingsStore } from "@/store/settings"
import { Link, useRouter } from "@tanstack/react-router"
import { BrainCircuit, FlaskRound, LayoutDashboard, Settings, Terminal } from "lucide-react"
import React, { useEffect } from "react"
import SidebarResizer from "../SidebarResizer"
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
  const { sidebarWidth, sidebarCollapsed } = useSettingsStore()

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
      icon: <LayoutDashboard className="h-7 w-7" />,
      label: "Tools",
      path: "/tools",
    },
    {
      icon: <Terminal className="h-7 w-7" />,
      label: "Prompt",
      path: "/prompt",
    },
    {
      icon: <BrainCircuit className="h-7 w-7" />,
      label: "Models",
      path: "/models",
    },
    {
      icon: <FlaskRound className="h-7 w-7" />,
      label: "Playground",
      path: "/playground",
    },
    {
      icon: <Settings className="h-7 w-7" />,
      label: "Settings",
      path: "/settings",
    },
  ]

  // 分离主要导航项和设置项
  const mainNavItems = navItems.slice(0, 4)
  const settingsItem = navItems[4]

  return (
    <div className="relative">
      <Sidebar
        className="h-screen border-r pt-16"
        style={{
          width: `${sidebarWidth}px`,
        }}
        variant="inset"
        collapsible="none"
      >
        <SidebarContent className="px-2">
          <SidebarMenu className="gap-2">
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  isActive={currentPath === item.path}
                  className={`w-full transition-all duration-200 ${
                    sidebarCollapsed ? "justify-center px-0" : "justify-start"
                  } ${
                    currentPath === item.path
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                      : "hover:bg-sidebar-accent/50"
                  }`}
                  size="default"
                >
                  <Link to={item.path} className="w-full">
                    <div className={`${sidebarCollapsed ? "mx-auto" : ""}`}>{item.icon}</div>
                    {!sidebarCollapsed && <span className="ml-2">{item.label}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="px-2 pb-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={currentPath === settingsItem.path}
                className={`w-full transition-all duration-200 ${
                  sidebarCollapsed ? "justify-center px-0" : "justify-start"
                } ${
                  currentPath === settingsItem.path
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                    : "hover:bg-sidebar-accent/50"
                }`}
                size="default"
              >
                <Link to={settingsItem.path} className="w-full">
                  <div className={`${sidebarCollapsed ? "mx-auto" : ""}`}>{settingsItem.icon}</div>
                  {!sidebarCollapsed && <span className="ml-2">{settingsItem.label}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarResizer />
    </div>
  )
}
