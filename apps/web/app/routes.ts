import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/login.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
  route("home", "routes/home.tsx"),
  route("minhas-atividades", "routes/atividades.tsx"),
  route("disciplinas", "routes/disciplinas.tsx"),
  route("conquistas", "routes/conquistas.tsx"),
] satisfies RouteConfig
