import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form } from "@inertiajs/react"
import { Plus } from "lucide-react"
import type { Adherent, Club } from "@/types"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

export function DogCreationForm({ errors, club, adherents }: { errors?: Record<string, string>, club: Club, adherents: Array<Adherent> }) {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		handleDialogClose()
	}, [errors])

	const handleDialogClose = () => {
		if (errors == undefined && open == true) {
			setOpen(false)
		}
	}
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="default">
					<Plus />
					Create Dog
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="sm:max-w-[425px] ">
				<AlertDialogHeader>
					<AlertDialogTitle>Create Adherent</AlertDialogTitle>
					<AlertDialogDescription>
						Add a new adherent to your club here. Click save when you&apos;re done.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Form action={`/clubs/${club.slug}/dogs/create/`} method="POST" className="grid gap-4" onSuccess={handleDialogClose}>
					<Input id="club" name="club" value={club.id} hidden />
					<div>
						<div className="grid gap-2">
							<div>
								<Label htmlFor="owner">Name</Label>
								<Select name="owner">
									<SelectTrigger className={errors && errors.owner ? "border-red-500" : ""}>
										<SelectValue placeholder="Select owner" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Adherents</SelectLabel>
											{adherents.map((adherent) => (
												<SelectItem key={adherent.id} value={adherent.id.toString()}>
													{adherent.first_name} {adherent.last_name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								{errors && errors.name && (
									<p className="text-red-500 text-sm mt-1">{errors.name}</p>
								)}
							</div>

							<div>
								<Label htmlFor="first_name">Name</Label>
								<Input id="name" name="name" placeholder="Nytro" className={errors && errors.name ? "border-red-500" : ""} />
								{errors && errors.name && (
									<p className="text-red-500 text-sm mt-1">{errors.name}</p>
								)}
							</div>

							<div>
								<Label htmlFor="breed">Breed</Label>
								<Input id="breed" name="breed" placeholder="Belgian Malinois" className={errors && errors.breed ? "border-red-500" : ""} />
								{errors && errors.breed && (
									<p className="text-red-500 text-sm mt-1">{errors.breed}</p>
								)}
							</div>

							<div>
								<Label htmlFor="age">Age</Label>
								<Input id="age" name="age" type="number" className={errors && errors.age ? "border-red-500" : ""} />
								{errors && errors.age && (
									<p className="text-red-500 text-sm mt-1">{errors.email}</p>
								)}
							</div>
						</div>
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel asChild>
							<Button variant="outline">Cancel</Button>
						</AlertDialogCancel>
						<Button type="submit">Add dog</Button>
					</AlertDialogFooter>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	)
}
