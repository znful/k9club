import React from "react";
import type { Club } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import { Button } from "./ui/button";

export function ClubCard({ club }: { club: Partial<Club> }) {
	return (
		<Card className="w-xs md:w-lg transition-all">
			<CardHeader>
				<CardTitle className="border-b pb-5">{club.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{club.description}</p>
			</CardContent>
			<CardFooter>
				<Link title={`Show ${club.name}`} href={`/clubs/${club.slug}`} prefetch>
					<Button variant="light">
						Edit
					</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
