import type { Adherent } from "@/types";
import React from "react";
import { Card, CardHeader } from "@/components/ui/card";

export default function AdherentHeader({ adherent, errors }: { adherent: Adherent, errors?: Record<string, string> }) {
	return (
		<Card>
			<CardHeader className="grid grid-cols-2 gap-4 items-center">
				<div>
					<h1 className="text-2xl font-bold">
						{adherent.first_name} {adherent.last_name}
					</h1>
					<div className="text-sm text-muted-foreground">
						<p>Email: {adherent.email ? adherent.email : 'N/A'}</p>
						<p>Phone: {adherent.phone_number ? adherent.phone_number : 'N/A'}</p>
						<p>Occupation: {adherent.occupation ? adherent.occupation : 'N/A'}</p>
					</div>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Details about adherent and membership...</p>
				</div>
			</CardHeader>
		</Card>
	);
}
