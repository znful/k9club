import React from "react";
import Layout from "@/layouts/app-layout";
import type { BreadcrumbItem, Club } from "@/types";

export default function Detail({ club }: { club: Club }) {
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
    }
  ]
  return (
    <>
      <Layout breadcrumbs={breadcrumbs}>
        <div>
          {club.name}
        </div>
      </Layout>
    </>
  )
}
