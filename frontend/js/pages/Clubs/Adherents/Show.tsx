import Layout from "@/layouts/app-layout";
import type { Adherent, BreadcrumbItem, Club } from "@/types";
import React from "react";

export default function Detail({ club, adherent, errors }: { club: Club, adherent: Adherent, errors?: Record<string, string> }) {
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
      title: club.slug,
      href: `/clubs/${club.slug}/`
    },
    {
      title: "Adherents",
      href: `/clubs/${club.slug}/adherents/`
    },
    {
      title: `${adherent.first_name} ${adherent.last_name}`,
      href: `/clubs/${club.slug}/adherents/${adherent.id}/`
    }
  ]

  return (
    <>
      <Layout breadcrumbs={breadcrumbs}>
        <div className="mt-4">
          <h1 className="text-2xl font-bold">{adherent.first_name} {adherent.last_name}</h1>
          <p className="text-sm text-muted-foreground">Adherent details will be displayed here.</p>
        </div>
      </Layout>
    </>
  )
}
