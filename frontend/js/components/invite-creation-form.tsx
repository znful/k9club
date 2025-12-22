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

import { type Club } from "@/types"

export function InvitationCreationForm({ club, errors }: { club: Club, errors?: Record<string, string> }) {
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
					Create Invitation
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="sm:max-w-[425px]">
				<AlertDialogHeader>
					<AlertDialogTitle>Create Invitation</AlertDialogTitle>
					<AlertDialogDescription>
						Invite a new staff member to the club.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Form action="/invitations/create/" method="POST" className="grid gap-4" onSuccess={handleDialogClose}>
					<input name="club" value={club.id} hidden />
					<div>
						<div className="grid gap-3">
							<Label htmlFor="email">Email</Label>
							<div className="mb-4">
								<Input id="email" name="email" placeholder="exemple@email.com" className={errors && errors.email ? "border-red-500" : ""} />
								{errors && errors.email && (
									<p className="text-red-500 text-sm mt-1">{errors.email}</p>
								)}
							</div>
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
