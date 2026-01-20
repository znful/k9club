import React, { useState } from 'react';
import type { Club, Dog } from '@/types';
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogHeader, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';
import { Trash, TriangleAlert } from 'lucide-react';
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
					<hr />
					<div className='flex flex-col mb-4 text-center'>
						<div className='flex justify-center mb-4'>
							<div className='bg-red-500/10 rounded-full justify-center mx-auto'>
								<TriangleAlert className='text-red-500 m-4' size={60} />
							</div>
						</div>
						<p>Are you sure you want to delete {dog.name} from {club.name} ?</p>
						<p>This action cannot be undone.</p>
					</div>
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
