import SecondPage from "@/pages/SecondPage"
import StateDemoPage from "@/pages/StateDemoPage"
import { createRoute } from "@tanstack/react-router"
import HomePage from "../../pages/HomePage"
import { MainRootRoute } from "./__root"

export const HomeRoute = createRoute({
  getParentRoute: () => MainRootRoute,
  path: "/",
  component: HomePage,
})

export const SecondPageRoute = createRoute({
  getParentRoute: () => MainRootRoute,
  path: "/second-page",
  component: SecondPage,
})

export const StateDemoRoute = createRoute({
  getParentRoute: () => MainRootRoute,
  path: "/state-demo",
  component: StateDemoPage,
})

export const mainRouteTree = MainRootRoute.addChildren([HomeRoute, SecondPageRoute, StateDemoRoute])
