import React from "react";
import type { BreadcrumbItem, Club, Invitation } from "@/types";
import ClubLayout from "@/layouts/club-layout";
import InvitationsTable from "@/components/invitations-table";

export default function Invitations({ invitations, club, errors }: { invitations: Invitation[], club: Club, errors?: Record<string, string> }) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "Clubs",
      href: "/clubs/"
    },
    {
      title: club.name,
      href: `/clubs/${club.slug}/`
    },
    {
      title: "Invitations",
      href: `/clubs/${club.slug}/invitations`
    }
  ]

  return (
    <>
      <ClubLayout breadcrumbs={breadcrumbs} club={club}>
        <InvitationsTable invitations={invitations} />
      </ClubLayout>
    </>
  )
}
