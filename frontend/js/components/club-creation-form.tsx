import React from "react"
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

export function ClubCreationForm() {
	return (
		<AlertDialog>
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
							<Input id="name" name="name" placeholder="Paul's canine club" />
						</div>
						<div className="grid gap-3">
							<Label htmlFor="description">Description</Label>
							<textarea id="description" name="description" placeholder="Describe your club using a few words..." />
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
