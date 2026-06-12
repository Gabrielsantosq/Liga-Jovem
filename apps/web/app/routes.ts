import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/login.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
  //Aluno
  route("home", "routes/aluno/home.tsx"),
  route("minhas-atividades", "routes/aluno/atividades.tsx"),
  route("disciplinas", "routes/aluno/disciplinas.tsx"),
  route("notas", "routes/aluno/notas.tsx"),

  //Professor
  route("dashboard-professor", "routes/professor/dashboard.tsx"),
  route("atividades-professor", "routes/professor/atividades.tsx"),
  route("notas-Professor", "routes/professor/notas.tsx"),
  route("turmas", "routes/professor/turmas.tsx"),

  //turmas
  route("turmas/:id", "routes/professor/detalhes-turma.tsx"),

  route("teste", "routes/teste.tsx"),
] satisfies RouteConfig
