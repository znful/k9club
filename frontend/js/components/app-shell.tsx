import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface AppShellProps {
	children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
	const isOpen = usePage<SharedData>().props.sidebarOpen || true;
	console.log(isOpen);

	return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}
