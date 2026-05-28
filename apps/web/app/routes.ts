import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("minhas-atividades", "routes/atividades.tsx"),
  route("disciplinas", "routes/disciplinas.tsx"),
  route("conquistas", "routes/conquistas.tsx"),
] satisfies RouteConfig
