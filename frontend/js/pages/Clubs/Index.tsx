import React from 'react';
import Layout from '@/layouts/app-layout';
import type { BreadcrumbItem, Club } from '@/types';
import { ClubCard } from '@/components/club-card';
import { ClubCreationForm } from '@/components/club-creation-form';

interface Props {
  clubs?: Partial<Club>[]
}

export default function Index({ clubs }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "Clubs",
      href: "/clubs"
    }
  ]
  return (
    <Layout breadcrumbs={breadcrumbs} actions={(<>
      <ClubCreationForm />
    </>)}>
      <div className="flex gap-4 justify-center flex-wrap sm:flex-row lg:justify-start">
        {clubs != undefined && clubs.map((club) => (
          <ClubCard club={club} key={club.id} />
        ))}
      </div>
    </Layout>
  );
}
