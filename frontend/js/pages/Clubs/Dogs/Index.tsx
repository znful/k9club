import DogsTable from '@/components/dogs-table';
import Layout from '@/layouts/app-layout';
import type { Club, Dog } from '@/types';
import React from 'react'

export default function Index({ club, dogs }: { club: Club, dogs: Array<Dog> }) {
  const breadcrumbs = [
    {
      title: "Home",
      href: "/"
    },
    {
      title: club.name,
      href: `/clubs/${club.slug}/`
    },
    {
      title: "Dogs",
      href: `/clubs/${club.slug}/dogs/`
    }
  ];

  return (
    <>
      <Layout breadcrumbs={breadcrumbs}>
        <DogsTable dogs={dogs} club={club} showOwner />
      </Layout>
    </>
  )
}
