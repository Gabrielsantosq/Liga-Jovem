import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/redirect-root.ts"),
  route("login", "routes/login.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
  route("home", "routes/redirect-home.ts"),
  route("sign-out", "routes/sign-out.ts"),

  // Better-auth handler
  route("api/auth/*", "routes/api/auth.$.ts"),

  // API
  route("api/schools", "routes/api/schools.ts"),
  route("api/schools/:id", "routes/api/schools.$id.ts"),
  route("api/school-years", "routes/api/school-years.ts"),
  route("api/school-years/:id", "routes/api/school-years.$id.ts"),
  route("api/classes", "routes/api/classes.ts"),
  route("api/classes/:id", "routes/api/classes.$id.ts"),
  route("api/class-students", "routes/api/class-students.ts"),
  route("api/class-students/:id", "routes/api/class-students.$id.ts"),
  route("api/class-teachers", "routes/api/class-teachers.ts"),
  route("api/class-teachers/:id", "routes/api/class-teachers.$id.ts"),
  route("api/subjects", "routes/api/subjects.ts"),
  route("api/subjects/:id", "routes/api/subjects.$id.ts"),
  route("api/topics", "routes/api/topics.ts"),
  route("api/topics/:id", "routes/api/topics.$id.ts"),
  route("api/lessons", "routes/api/lessons.ts"),
  route("api/lessons/:id", "routes/api/lessons.$id.ts"),
  route("api/activities", "routes/api/activities.ts"),
  route("api/activities/:id", "routes/api/activities.$id.ts"),
  route("api/submissions", "routes/api/submissions.ts"),
  route("api/submissions/:id", "routes/api/submissions.$id.ts"),
  route("api/grades", "routes/api/grades.ts"),
  route("api/grades/:id", "routes/api/grades.$id.ts"),
  route("api/attendence", "routes/api/attendence.ts"),
  route("api/attendence/:id", "routes/api/attendence.$id.ts"),
  route("api/users", "routes/api/users.ts"),
  route("api/users/:id", "routes/api/users.$id.ts"),
  // Professor
  route("professor", "routes/professor/layout.tsx", [
    route("turmas", "routes/professor/turmas.tsx"),
    route("turmas/:id", "routes/professor/detalhes-turma.tsx"),
    route("turmas/:id/atividades", "routes/professor/atividades.tsx"),
    route("turmas/:id/atividades/nova", "routes/professor/criar-atividade.tsx"),
    route(
      "turmas/:id/atividades/:atividadeId",
      "routes/professor/detalhes-atividade.tsx"
    ),
    route("teste", "routes/teste.tsx"),
  ]),
  route("aluno", "routes/aluno/layout.tsx", [
    route("home", "routes/aluno/home.tsx"),
    route("entrar-turma", "routes/aluno/entrar-turma.tsx"),
    route("turma/:id", "routes/aluno/turma.tsx"),
    route("turma/:id/atividades", "routes/aluno/atividades.tsx"),
    route("turma/:id/atividades/:atividadesId", "routes/aluno/detalhes-atividade.tsx"),
  ]),
] satisfies RouteConfig
