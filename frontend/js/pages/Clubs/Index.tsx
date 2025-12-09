import React from 'react';
import Layout from '@/layouts/app-layout';
import type { Club } from '@/types';

interface Props {
  clubs?: Partial<Club>[]
}

export default function Index({ clubs }: Props) {
  return (
    <Layout>
      <div className="">
        <h2 className="text-3xl font-bold underline">Clubs</h2>
        {clubs != undefined && clubs.map((club) => (
          <h1 key={club.id}>{club.name}</h1>
        ))}
      </div>
    </Layout>
  );
}
