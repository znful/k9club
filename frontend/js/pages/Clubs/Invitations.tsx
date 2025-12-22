import React from "react";
import type { BreadcrumbItem, Club } from "@/types";
import ClubLayout from "@/layouts/club-layout";

export default function Invitations({ club, errors }: { club: Club, errors?: Record<string, string> }) {
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
        <div className="mt-4">
        </div>
      </ClubLayout>
    </>
  )
}
