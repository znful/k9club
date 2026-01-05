import React from "react";
import type { Adherent, Club } from "@/types";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function AdherentsTable({ adherents, club }: { adherents: Adherent[], club: Club }) {
	return (
		<>
			{adherents.length > 0 && (
				<Table>
					<TableCaption>A list of the club adherents.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>First name</TableHead>
							<TableHead>Last name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Phone Number</TableHead>
							<TableHead>Occupation</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{adherents.map((adherent, index) => (
							<TableRow key={`${adherent.id}-${index}`}>
								<TableCell className="font-medium">{adherent.first_name}</TableCell>
								<TableCell className="font-medium">{adherent.last_name}</TableCell>
								<TableCell>{adherent.email}</TableCell>
								<TableCell>{adherent.phone_number}</TableCell>
								<TableCell>{adherent.occupation}</TableCell>
								<TableCell>
									<div>
										<Button variant="default" size="sm" title="View adherent" asChild>
											<Link href={`/clubs/${club.slug}/adherents/${adherent.id}`} prefetch>
												<Eye />
											</Link>
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
			{adherents.length <= 0 && (
				<p>No adherents found </p>
			)}
		</>
	)
}
