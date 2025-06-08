import SecondPage from "@/pages/SecondPage"
import StateDemoPage from "@/pages/StateDemoPage"
import { createRoute } from "@tanstack/react-router"
import HomePage from "../../pages/HomePage"
import { AppRootRoute } from "./__root"

export const HomeRoute = createRoute({
  getParentRoute: () => AppRootRoute,
  path: "/",
  component: HomePage,
})

export const SecondPageRoute = createRoute({
  getParentRoute: () => AppRootRoute,
  path: "/second-page",
  component: SecondPage,
})

export const StateDemoRoute = createRoute({
  getParentRoute: () => AppRootRoute,
  path: "/state-demo",
  component: StateDemoPage,
})

export const appRouteTree = AppRootRoute.addChildren([HomeRoute, SecondPageRoute, StateDemoRoute])
