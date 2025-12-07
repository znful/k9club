import React from 'react';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { SidebarInset } from '@/components/ui/sidebar';

export function Layout({
	children,
	breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
	return (
		<AppShell>
			<AppSidebar />
			<SidebarInset className="overflow-x-hidden">
				<div className='ml-36'>
					<AppSidebarHeader breadcrumbs={breadcrumbs} />
					{children}
				</div>
			</SidebarInset>
		</AppShell>
	);
}

export default (page) => <Layout>{page}</Layout>
