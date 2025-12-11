import React from 'react';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { ThemeProvider } from '@/components/theme-provider';

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
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<AppSidebarHeader breadcrumbs={breadcrumbs} />
					<main className='md:px-4'>
						{children}
					</main>
				</SidebarInset>
			</SidebarProvider>
		</ThemeProvider>
	);
}

