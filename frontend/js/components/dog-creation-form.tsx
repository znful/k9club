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
import { Textarea } from "./ui/textarea"

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
			<AlertDialogContent className="sm:max-w-150">
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
								<Input id="age" name="age" type="number" min={0} className={errors && errors.age ? "border-red-500" : ""} />
								{errors && errors.age && (
									<p className="text-red-500 text-sm mt-1">{errors.age}</p>
								)}
							</div>

							<div>
								<Label htmlFor="date_of_birth">Date of birth</Label>
								<Input id="date_of_birth" name="date_of_birth" type="date" className={errors && errors.date_of_birth ? "border-red-500" : ""} />
								{errors && errors.date_of_birth && (
									<p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>
								)}
							</div>

							<div>
								<Label htmlFor="chip_number">Chip number</Label>
								<Input id="chip_number" name="chip_number" type="text" className={errors && errors.chip_number ? "border-red-500" : ""} />
								{errors && errors.chip_number && (
									<p className="text-red-500 text-sm mt-1">{errors.chip_number}</p>
								)}
							</div>
							<div>
								<Label htmlFor="notes">Notes</Label>
								<Textarea id="notes" name="notes" rows={5} className={errors && errors.notes ? "border-red-500" : ""} />
								{errors && errors.notes && (
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
