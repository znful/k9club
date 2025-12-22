import React from "react";
import type { Invitation } from "@/types";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

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
						</TableRow>
					</TableHeader>
					<TableBody>
						{invitations.map((invitation, index) => (
							<TableRow key={`${invitation.token}-${index}`}>
								<TableCell className="font-medium">{invitation.email}</TableCell>
								<TableCell>{invitation.accepted ? "ACCEPTED" : "SENT"}</TableCell>
								<TableCell className="text-right">{invitation.invited_by.username}</TableCell>
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
