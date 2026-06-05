import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/login.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
  route("home", "routes/aluno/home.tsx"),
  route("minhas-atividades", "routes/aluno/atividades.tsx"),
  route("disciplinas", "routes/aluno/disciplinas.tsx"),
  route("conquistas", "routes/aluno/conquistas.tsx"),
] satisfies RouteConfig
