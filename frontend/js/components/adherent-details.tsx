import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/custom-tabs';
import type { Adherent } from '@/types';
import React from 'react';
import DogsTable from './dogs-table';

export default function AdherentDetails({ adherent }: { adherent: Adherent }) {
	return (
		<>
			<div className='w-full mt-4'>
				<Tabs defaultValue='dogs'>
					<TabsList>
						<TabsTrigger value='dogs'>Dogs</TabsTrigger>
						<TabsTrigger value='misc'>Misc</TabsTrigger>
					</TabsList>
					<TabsContent value='dogs'>
						<DogsTable dogs={adherent.dogs} />
					</TabsContent>
					<TabsContent value='misc'>
						<p>Miscellaneous information...</p>
					</TabsContent>
				</Tabs>
			</div>
		</>
	)
}
