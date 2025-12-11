import React from "react"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "@inertiajs/react"
import type { NavItem } from "@/types"

// Menu items.
const items: NavItem[] = [
	{
		title: "Home",
		href: "#",
		icon: Home,
	},
	{
		title: "Inbox",
		href: "#",
		icon: Inbox,
	},
	{
		title: "Calendar",
		href: "#",
		icon: Calendar,
	},
	{
		title: "Search",
		href: "#",
		icon: Search,
	},
	{
		title: "Settings",
		href: "#",
		icon: Settings,
	},
]

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon" variant="inset" className="sticky">
			<SidebarContent className="">
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton className="md: w-48" asChild>
										<Link href={item.href} prefetch>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
