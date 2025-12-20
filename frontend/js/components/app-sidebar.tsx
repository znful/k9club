import React from "react"
import { Home, Warehouse } from "lucide-react"

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
		href: "/",
		icon: Home,
	},
	{
		title: "Clubs",
		href: "/clubs",
		icon: Warehouse
	}
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
									<SidebarMenuButton asChild>
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
