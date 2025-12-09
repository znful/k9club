import React from 'react';
import Layout from '@/layouts/app-layout';
import type { Club } from '@/types';

export default function Index({ clubs }: { clubs: Club[] }) {
  return (
    <Layout>
      <div className="">
        <h2 className="text-3xl font-bold underline">Clubs</h2>
        <p className="text-lg font-mono">
          {clubs.map((club) => (
            <h1 key={club.id}>{club.name}</h1>
          ))}
        </p>
      </div>
    </Layout>
  );
}
