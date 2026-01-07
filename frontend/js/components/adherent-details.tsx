import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/custom-tabs';
import type { Adherent } from './types';
import React from 'react';

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
						<p>List of dogs...</p>
					</TabsContent>
					<TabsContent value='misc'>
						<p>Miscellaneous information...</p>
					</TabsContent>
				</Tabs>
			</div>
		</>
	)
}
