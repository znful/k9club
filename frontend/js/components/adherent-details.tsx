import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/custom-tabs';
import type { Adherent, Club } from '@/types';
import React from 'react';
import DogsTable from './dogs-table';

export default function AdherentDetails({ adherent, club }: { adherent: Adherent, club: Club }) {
	return (
		<>
			<div className='w-full mt-4'>
				<Tabs defaultValue='dogs'>
					<TabsList>
						<TabsTrigger value='dogs'>Dogs</TabsTrigger>
						<TabsTrigger value='misc'>Misc</TabsTrigger>
					</TabsList>
					<TabsContent value='dogs'>
						<DogsTable dogs={adherent.dogs} club={club} />
					</TabsContent>
					<TabsContent value='misc'>
						<p>Miscellaneous information...</p>
					</TabsContent>
				</Tabs>
			</div>
		</>
	)
}
