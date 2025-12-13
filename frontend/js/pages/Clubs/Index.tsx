import React from 'react';
import Layout from '@/layouts/app-layout';
import type { BreadcrumbItem, Club } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ClubCard } from '@/components/club-card';

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
      <Link href="/" title='Back Home'>
        <Button variant='default' size='sm'>Back Home </Button>
      </Link>
    </>)}>
      <div className="flex gap-4 justify-center flex-wrap sm:flex-row lg:justify-start">
        {clubs != undefined && clubs.map((club) => (
          <ClubCard club={club} key={club.id} />
        ))}
      </div>
    </Layout>
  );
}
