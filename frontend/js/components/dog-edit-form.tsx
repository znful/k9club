import { Form } from "@inertiajs/react"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import React, { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import type { Adherent, Club, Dog } from "@/types"

export function DogEditForm({ errors, club, adherents, dog }: { errors?: Record<string, string>, club: Club, adherents: Array<Adherent>, dog: Dog }) {
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
					Edit Dog
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="sm:max-w-150">
				<AlertDialogHeader>
					<AlertDialogTitle>Edit Dog</AlertDialogTitle>
					<AlertDialogDescription>
						Edit the dog details here. Click save when you&apos;re done.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Form action={`/clubs/${club.slug}/dogs/${dog.id}/update/`} method="patch" className="grid gap-4" onSuccess={handleDialogClose}>
					<Input id="club" name="club" value={club.id} hidden readOnly />
					<div>
						<div className="grid gap-2">
							<div>
								<Label htmlFor="owner">Owner</Label>
								<Select name="owner" defaultValue={dog.owner.id.toString()}>
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
								{errors && errors.owner && (
									<p className="text-red-500 text-sm mt-1">{errors.owner}</p>
								)}
							</div>

							<div>
								<Label htmlFor="name">Name</Label>
								<Input id="name" name="name" defaultValue={dog.name} className={errors && errors.name ? "border-red-500" : ""}
								/>
								{errors && errors.name && (
									<p className="text-red-500 text-sm mt-1">{errors.name}</p>
								)}
							</div>

							<div>
								<Label htmlFor="breed">Breed</Label>
								<Input id="breed" name="breed" defaultValue={dog.breed} className={errors && errors.breed ? "border-red-500" : ""} />
								{errors && errors.breed && (
									<p className="text-red-500 text-sm mt-1">{errors.breed}</p>
								)}
							</div>

							<div>
								<Label htmlFor="age">Age</Label>
								<Input id="age" name="age" type="number" defaultValue={dog.age.toString()} className={errors && errors.age ? "border-red-500" : ""} />
								{errors && errors.age && (
									<p className="text-red-500 text-sm mt-1">{errors.age}</p>
								)}
							</div>
						</div>
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<Button type="submit">Save</Button>
					</AlertDialogFooter>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	)
}
