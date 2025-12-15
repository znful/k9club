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

export function ClubCreationForm({ errors }: { errors?: Record<string, string> }) {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (errors == undefined && open == true) {
			setOpen(false)
		}
	}, [errors])
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="default">
					<Plus />
					Create Club
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="sm:max-w-[425px] ">
				<AlertDialogHeader>
					<AlertDialogTitle>Create Club</AlertDialogTitle>
					<AlertDialogDescription>
						Create a new club here. Click save when you&apos;re done.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Form action="/clubs/create/" method="POST" className="grid gap-4">
					<div>
						<div className="grid gap-3">
							<Label htmlFor="name">Name</Label>
							<div className="mb-4">
								<Input id="name" name="name" placeholder="Paul's canine club" className={errors && errors.name ? "border-red-500" : ""} />
								{errors && errors.name && (
									<p className="text-red-500 text-sm mt-1">{errors.name}</p>
								)}
							</div>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="description">Description</Label>
							<Textarea id="description" name="description" placeholder="Describe your club using a few words..." rows={5} />
						</div>

					</div>
					<AlertDialogFooter>
						<AlertDialogCancel asChild>
							<Button variant="outline">Cancel</Button>
						</AlertDialogCancel>
						<Button type="submit">Create club</Button>
					</AlertDialogFooter>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	)
}
