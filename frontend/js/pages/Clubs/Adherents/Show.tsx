import React from "react";
import Layout from "@/layouts/app-layout";
import type { Adherent, BreadcrumbItem, Club } from "@/types";
import AdherentHeader from "@/components/adherent-header";
import AdherentDetails from "@/components/adherent-details";
import { AdherentDogCreationForm } from "@/components/adherent-dog-creation-form";

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
      title: club.name,
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
      <Layout breadcrumbs={breadcrumbs} actions={
        <>
          <AdherentDogCreationForm errors={errors} club={club} adherent={adherent} />
        </>
      }>
        <AdherentHeader adherent={adherent} errors={errors} />
        <AdherentDetails adherent={adherent} club={club} />
      </Layout>
    </>
  )
}
