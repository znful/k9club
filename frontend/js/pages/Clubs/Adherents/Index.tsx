import React from "react";
import Layout from "@/layouts/app-layout";
import type { Adherent, BreadcrumbItem, Club } from "@/types";

interface Props {
  club: Club;
  adherents?: Adherent[];
  errors?: Record<string, string>
}

export default function Index({ club, errors }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Home", href: "/" },
    { title: "Clubs", href: "/clubs" },
    { title: "Adherents", href: `/clubs/${club.id}/adherents` },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <div>
        <h1>{club.name}</h1>
        <p>{club.description}</p>
      </div>
      <div>
        <p>adherents table</p>
      </div>
    </Layout>
  );
}
