"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { siteConfig } from "@/lib/config";

const data = {
  user: {
    name: "Mohamed Aly",
    email: "admin@awm-datathon.qa",
    avatar: `https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144847501.jpg`,
  },
  teams: [
    {
      name: "National Planning Council",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: PieChart,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Analytics",
          url: "/dashboard/soon",
        },
        {
          title: "Reports",
          url: "/dashboard/soon",
        },
      ],
    },
    {
      title: "Data Explorer",
      url: "/dashboard/soon",
      icon: Bot,
      items: [
        {
          title: "Datasets",
          url: "/dashboard/soon",
        },
        {
          title: "Visualizations",
          url: "/dashboard/soon",
        },
        {
          title: "Analysis Tools",
          url: "/dashboard/soon",
        },
      ],
    },
    {
      title: "Planning Tools",
      url: "/dashboard/soon",
      icon: Map,
      items: [
        {
          title: "Strategic Planning",
          url: "/dashboard/soon",
        },
        {
          title: "Resource Allocation",
          url: "/dashboard/soon",
        },
        {
          title: "Project Tracking",
          url: "/dashboard/soon",
        },
      ],
    },
  ],
  projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-primary text-white font-semibold">
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="px-1.5 pb-1 group-data-[collapsible=icon]:hidden">
          NPC Datathon
        </div>
        <div className="px-1.5 pb-1 hidden group-data-[collapsible=icon]:block">
          N
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
