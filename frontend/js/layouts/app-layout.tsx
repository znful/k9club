import React from 'react';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export default function Layout({
	children,
	breadcrumbs = [
		{
			title: "Home",
			href: "/"
		}
	],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className='ps-4 pt-4'>
				<SidebarTrigger />
				<main>
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}

