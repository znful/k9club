import React from "react";
import Layout from "@/layouts/app-layout";
import type { Adherent, BreadcrumbItem, Club } from "@/types";
import AdherentsTable from "@/components/adherents-table";
import { AdherentCreationForm } from "@/components/adherent-creation-form";

interface Props {
  club: Club;
  adherents?: Adherent[];
  errors?: Record<string, string>
}

export default function Index({ club, adherents, errors }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Home", href: "/" },
    { title: "Clubs", href: "/clubs/" },
    { title: club.name, href: `/clubs/${club.slug}/` },
    { title: "Adherents", href: `/clubs/${club.id}/adherents/` },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs} actions={<>
      <AdherentCreationForm errors={errors} club={club} />
    </>}>
      <AdherentsTable club={club} adherents={adherents} />
    </Layout>
  );
}
