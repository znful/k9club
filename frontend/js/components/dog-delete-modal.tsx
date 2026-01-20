import React, { useState } from 'react';
import type { Club, Dog } from '@/types';
import { AlertDialog, AlertDialogHeader, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';
import { AlertDialogContent, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { Form } from '@inertiajs/react';
export function DogDeleteModal({ club, dog }: { club: Club, dog: Dog }) {
	const [open, setOpen] = useState(false)
	return (
		<>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogTrigger asChild>
					<Button variant='destructive'>
						<Trash />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure you want to delete {dog.name}?</AlertDialogTitle>
					</AlertDialogHeader>
					<p className="mb-4">This action cannot be undone.</p>
					<div className="flex justify-end gap-4">
						<Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
						<Form action={`/clubs/${club.slug}/dogs/${dog.id}/delete/`} method="delete">
							<Button type="submit" variant="destructive">Delete</Button>
						</Form>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
