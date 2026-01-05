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
import { Textarea } from "@/components/ui/textarea"
import type { Club } from "@/types"

export function AdherentCreationForm({ errors, club }: { errors?: Record<string, string>, club: Club }) {
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
					Create Adherent
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="sm:max-w-[425px] ">
				<AlertDialogHeader>
					<AlertDialogTitle>Create Adherent</AlertDialogTitle>
					<AlertDialogDescription>
						Add a new adherent to your club here. Click save when you&apos;re done.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Form action={`/clubs/${club.slug}/adherents/create/`} method="POST" className="grid gap-4" onSuccess={handleDialogClose}>
					<Input id="club" name="club" value={club.id} hidden />
					<div>
						<div className="grid gap-2">

							<div>
								<Label htmlFor="first_name">First name</Label>
								<Input id="first_name" name="first_name" placeholder="John" className={errors && errors.first_name ? "border-red-500" : ""} />
								{errors && errors.first_name && (
									<p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
								)}
							</div>

							<div>
								<Label htmlFor="last_name">Last name</Label>
								<Input id="last_name" name="last_name" placeholder="Smith" className={errors && errors.last_name ? "border-red-500" : ""} />
								{errors && errors.last_name && (
									<p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
								)}
							</div>

							<div>
								<Label htmlFor="email">Email</Label>
								<Input id="email" name="email" placeholder="johnsmith@email.com" type="email" className={errors && errors.email ? "border-red-500" : ""} />
								{errors && errors.email && (
									<p className="text-red-500 text-sm mt-1">{errors.email}</p>
								)}
							</div>

							<div>
								<Label htmlFor="phone_number">Phone Number</Label>
								<Input id="phone_number" name="phone_number" className={errors && errors.phone_number ? "border-red-500" : ""} />
								{errors && errors.phone_number && (
									<p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
								)}
							</div>

							<div>
								<Label htmlFor="occupation">Occupation</Label>
								<Input id="occupation" name="occupation" className={errors && errors.occupation ? "border-red-500" : ""} />
								{errors && errors.occupation && (
									<p className="text-red-500 text-sm mt-1">{errors.occupation}</p>
								)}
							</div>

							<div>
								<Label htmlFor="notes">Notes</Label>
								<Textarea id="notes" name="notes" className={errors && errors.notes ? "border-red-500" : ""} rows={5} />
								{errors && errors.notes && (
									<p className="text-red-500 text-sm mt-1">{errors.notes}</p>
								)}
							</div>

						</div>
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel asChild>
							<Button variant="outline">Cancel</Button>
						</AlertDialogCancel>
						<Button type="submit">Create Adherent</Button>
					</AlertDialogFooter>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	)
}
