import React from "react";
import type { Invitation } from "@/types";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function InvitationsTable({ invitations }: { invitations: Invitation[] }) {
	return (
		<>
			{invitations.length > 0 && (
				<Table>
					<TableCaption>A list of the club invitations.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Email</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Invited by</TableHead>
							<TableHead>Token</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{invitations.map((invitation, index) => (
							<TableRow key={`${invitation.token}-${index}`}>
								<TableCell className="font-medium">{invitation.email}</TableCell>
								<TableCell>{invitation.accepted ? "ACCEPTED" : "SENT"}</TableCell>
								<TableCell>{invitation.invited_by.username}<span className="text-muted-foreground text-xs ms-1">({invitation.invited_by.email})</span></TableCell>
								<TableCell>{invitation.token}</TableCell>
								<TableCell>
									<div>
										<Button variant="destructive" size="sm" disabled={invitation.accepted} title="Delete invitation" asChild>
											<Link href={`/invitations/${invitation.id}/destroy/`} method="delete" preserveScroll>
												<Trash />
											</Link>
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
			{invitations.length <= 0 && (
				<p>No invites found </p>
			)}
		</>
	)
}
