import React from "react";
import { SidebarProvider, SidebarTrigger, Sidebar } from "@/components/ui/sidebar"

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<Sidebar />
			<main>
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	)
}

export default (page) => <Layout>{page}</Layout>;
