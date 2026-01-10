import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Dog } from "@/types";

export default function DogsTable({ dogs }: { dogs: Array<Dog> }) {
	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
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
							<TableCell>{dog.breed}</TableCell>
							<TableCell>{dog.age}</TableCell>
							<TableCell>{dog.chip_number}</TableCell>
							<TableCell>
								{/* Actions can be added here in the future */}
								<p>View | Edit | Delete</p>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
