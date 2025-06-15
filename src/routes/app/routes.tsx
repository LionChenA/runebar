import { SettingsPage } from "@/components/runebar/pages/SettingsPage"
import ModelsPage from "@/pages/ModelsPage"
import PlaygroundPage from "@/pages/PlaygroundPage"
import PromptPage from "@/pages/PromptPage"
import ToolsPage from "@/pages/ToolsPage"
import { createRoute } from "@tanstack/react-router"
import HomePage from "../../pages/HomePage"
import { AppRootRoute } from "./__root"

export const HomeRoute = createRoute({
  getParentRoute: () => AppRootRoute,
  path: "/",
  component: HomePage,
})

export const ToolsRoute = createRoute({
  getParentRoute: () => AppRootRoute,
  path: "/tools",
  component: ToolsPage,
})

export const PromptRoute = createRoute({
  getParentRoute: () => AppRootRoute,
  path: "/prompt",
  component: PromptPage,
})

export const ModelsRoute = createRoute({
  getParentRoute: () => AppRootRoute,
  path: "/models",
  component: ModelsPage,
})

export const PlaygroundRoute = createRoute({
  getParentRoute: () => AppRootRoute,
  path: "/playground",
  component: PlaygroundPage,
})

export const SettingsRoute = createRoute({
  getParentRoute: () => AppRootRoute,
  path: "/settings",
  component: SettingsPage,
})

export const appRouteTree = AppRootRoute.addChildren([
  HomeRoute,
  ToolsRoute,
  PromptRoute,
  ModelsRoute,
  PlaygroundRoute,
  SettingsRoute,
])
