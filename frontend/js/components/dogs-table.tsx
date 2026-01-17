import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Club, Dog } from "@/types";
import { Link } from "@inertiajs/react";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";

export default function DogsTable({ dogs, club, showOwner = false }: { dogs: Array<Dog>, club: Club, showOwner?: boolean }) {
	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						{showOwner && (<TableHead>Owner</TableHead>)}
						<TableHead>Breed</TableHead>
						<TableHead>Age</TableHead>
						<TableHead>Chip Number</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{dogs.map((dog, index) => (
						<TableRow key={`${dog.id}-${index}`}>
							<TableCell className="font-medium">{dog.name}</TableCell>
							{showOwner && (<TableCell>{dog.owner.first_name + " " + dog.owner.last_name}</TableCell>)}
							<TableCell>{dog.breed}</TableCell>
							<TableCell>{dog.age}</TableCell>
							<TableCell>{dog.chip_number}</TableCell>
							<TableCell>
								<Link href={`/clubs/${club.slug}/dogs/${dog.id}`} prefetch>
									<Button variant="default" size="sm">
										<Eye />
									</Button>
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
