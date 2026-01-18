import { DogCreationForm } from '@/components/dog-creation-form';
import DogsTable from '@/components/dogs-table';
import Layout from '@/layouts/app-layout';
import type { Adherent, Club, Dog } from '@/types';
import React from 'react'

export default function Index({ club, dogs, adherents, errors }: { club: Club, dogs: Array<Dog>, adherents: Array<Adherent>, errors?: Record<string, string> }) {
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
      <Layout breadcrumbs={breadcrumbs} actions={
        <>
          <DogCreationForm club={club} adherents={adherents} errors={errors} />
        </>
      }>
        <DogsTable dogs={dogs} club={club} showOwner />
      </Layout>
    </>
  )
}
