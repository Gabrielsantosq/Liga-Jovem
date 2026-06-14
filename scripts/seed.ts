import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { eq } from "drizzle-orm"
import { auth } from "../packages/auth/lib/auth"
import { users } from "../packages/database/schema/academics/users"
import { classes } from "../packages/database/schema/academics/classes"
import { classStudents } from "../packages/database/schema/academics/class_students"
import { activities } from "../packages/database/schema/academics/activities"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

const seedData = [
  { name: "Prof. João Silva", email: "joao.prof@escola.com", password: "Senha123!", role: "teacher" as const },
  { name: "Prof. Ana Costa", email: "ana.prof@escola.com", password: "Senha123!", role: "teacher" as const },
  { name: "Carlos Aluno", email: "carlos.aluno@escola.com", password: "Senha123!", role: "student" as const },
  { name: "Beatriz Aluna", email: "beatriz.aluno@escola.com", password: "Senha123!", role: "student" as const },
]

async function upsertAcademicUser(id: string, name: string, email: string, role: "teacher" | "student") {
  await db
    .insert(users)
    .values({ id, name, email, password: "auth-managed", role })
    .onConflictDoNothing()
}

async function seed() {
  console.log("🌱 Seeding database...\n")

  const createdUsers: { id: string; name: string; role: string }[] = []

  for (const u of seedData) {
    try {
      const result = await auth.api.signUpEmail({
        body: { name: u.name, email: u.email, password: u.password, role: u.role },
      }) as { user: { id: string } }

      await upsertAcademicUser(result.user.id, u.name, u.email, u.role)
      createdUsers.push({ id: result.user.id, name: u.name, role: u.role })
      console.log(`✓ Created ${u.role}: ${u.name} (${u.email}) → id: ${result.user.id}`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.toLowerCase().includes("already") || msg.toLowerCase().includes("unique") || msg.toLowerCase().includes("duplicate")) {
        console.log(`⚠ Skipped (already exists): ${u.email}`)
        // Try to look up existing user to get their ID for the rest of the seed
        const [existing] = await db.select().from(users).where(eq(users.email, u.email))
        if (existing) createdUsers.push({ id: existing.id, name: existing.name, role: existing.role })
      } else {
        console.error(`✗ Failed to create ${u.email}:`, msg)
      }
    }
  }

  const teachers = createdUsers.filter((u) => u.role === "teacher")
  const students = createdUsers.filter((u) => u.role === "student")

  if (teachers.length === 0) {
    console.log("\n⚠ No teachers created, skipping class creation.")
    await pool.end()
    return
  }

  // Create a demo class
  const classCode = "DEMO01"
  const classId = crypto.randomUUID()

  try {
    await db.insert(classes).values({
      id: classId,
      name: "A",
      gradeLevel: "1º Ano",
      shift: "morning",
      code: classCode,
      createdBy: teachers[0].id,
    })
    console.log(`\n✓ Created class: 1º Ano A (code: ${classCode})`)
  } catch {
    console.log(`⚠ Class already exists or could not be created, skipping.`)
    await pool.end()
    return
  }

  // Enroll students
  for (const student of students) {
    await db
      .insert(classStudents)
      .values({ id: crypto.randomUUID(), classId, studentId: student.id })
      .onConflictDoNothing()
    console.log(`✓ Enrolled ${student.name} in class`)
  }

  // Create a demo activity
  await db.insert(activities).values({
    id: crypto.randomUUID(),
    classId,
    userId: teachers[0].id,
    name: "Lista de Exercícios 1",
    description: "Resolva os exercícios do capítulo 1.",
    type: "assignment",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: "active",
  })
  console.log(`✓ Created demo activity`)

  console.log("\n✅ Seed complete!")
  console.log("\n📋 Test credentials:")
  console.log("  Professor 1: joao.prof@escola.com / Senha123!")
  console.log("  Professor 2: ana.prof@escola.com  / Senha123!")
  console.log("  Aluno 1:     carlos.aluno@escola.com / Senha123!")
  console.log("  Aluno 2:     beatriz.aluno@escola.com / Senha123!")
  console.log(`  Código da turma demo: ${classCode}`)

  await pool.end()
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
