"use client"

import * as React from "react"

import { NavMain } from "@workspace/ui/components/nav-main"
import { TeamSwitcher } from "@workspace/ui/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar"
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  BookOpenIcon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  Home,
  Book,
  School,
  Trophy,
} from "lucide-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  teams: [
    {
      name: "Liga-Jovem",
      logo: <GalleryVerticalEndIcon />,
      plan: "Aluno",
    },
  ],
  navMain: [
    {
      title: "Inicio",
      url: "home",
      icon: <Home />,
    },
    {
      title: "Minhas Atividades",
      url: "/minhas-atividades",
      icon: <BookOpenIcon />,
    },
    {
      title: "Disciplinas",
      url: "disciplinas",
      icon: <Book />,
    },
    {
      title: "Notas",
      url: "#",
      icon: <BookOpenIcon />,
    },
    {
      title: "Conquistas",
      url: "conquistas",
      icon: <Trophy />,
    },
  ],
}

export function SidebarAluno({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <h1>Em branco</h1>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
