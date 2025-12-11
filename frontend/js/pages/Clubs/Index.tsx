import React from 'react';
import Layout from '@/layouts/app-layout';
import type { BreadcrumbItem, Club } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

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
      <div className="">
        {clubs != undefined && clubs.map((club) => (
          <h1 key={club.id}>{club.name}</h1>
        ))}
      </div>
    </Layout>
  );
}
