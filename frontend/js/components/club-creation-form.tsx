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
		<AlertDialog >
			<Form action="/clubs/" method="POST">
				<AlertDialogTrigger asChild>
					<Button variant="default">
						<Plus />
						Create Club
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="sm:max-w-[425px] ">
					<AlertDialogHeader>
						<AlertDialogTitle>Edit profile</AlertDialogTitle>
						<AlertDialogDescription>
							Make changes to your profile here. Click save when you&apos;re
							done.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="name-1">Name</Label>
							<Input id="name-1" name="name" defaultValue="Pedro Duarte" />
						</div>
						<div className="grid gap-3">
							<Label htmlFor="username-1">Username</Label>
							<Input id="username-1" name="username" defaultValue="@peduarte" />
						</div>
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel asChild>
							<Button variant="outline">Cancel</Button>
						</AlertDialogCancel>
						<Button type="submit">Save changes</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</Form>
		</AlertDialog>
	)
}
