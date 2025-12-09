import React from 'react';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';

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
			<SidebarInset>
				<AppSidebarHeader />
				<main className='md:px-4'>
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}

