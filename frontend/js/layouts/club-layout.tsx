import React from "react";
import type { BreadcrumbItem } from "@/types";
import type { PropsWithChildren, ReactNode } from "react";
import Layout from "./app-layout";
import { Button } from "@/components/ui/button";
import { cn, isSameUrl, resolveUrl } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Link } from "@inertiajs/react";

export default function ClubLayout({
	children,
	breadcrumbs,
	actions,
	sidebarNavItems
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[], actions?: ReactNode, sidebarNavItems: { title: string, href: string }[] }>) {
	const currentPath = window.location.pathname;
	return (
		<Layout breadcrumbs={breadcrumbs} actions={actions}>
			<div className="flex flex-col lg:flex-row lg:space-x-12">
				<aside className="w-full max-w-xl lg:w-48">
					<nav className="flex flex-col space-y-1 space-x-0">
						{sidebarNavItems.map((item, index) => (
							<Button
								key={`${resolveUrl(item.href)}-${index}`}
								size="sm"
								variant="ghost"
								asChild
								className={cn('w-full justify-start', {
									'bg-muted': isSameUrl(
										currentPath,
										item.href,
									),
								})}
							>
								<Link href={item.href}>
									{item.title}
								</Link>
							</Button>
						))}
					</nav>
				</aside>

				<Separator className="my-6 lg:hidden" />

				<div className="flex-1 md:max-w-2xl">
					<section className="max-w-xl space-y-12">
						{children}
					</section>
				</div>
			</div>
		</Layout>
	)
}
