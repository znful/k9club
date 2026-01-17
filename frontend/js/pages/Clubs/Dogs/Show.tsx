import Layout from '@/layouts/app-layout';
import type { Club, Dog } from '@/types';
import React from 'react';

export default function Detail({ club, dog, errors }: { club: Club, dog: Dog, errors?: Record<string, string> }) {
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
    },
    {
      title: `${dog.name}`,
      href: `/clubs/${club.slug}/dogs/${dog.id}/`
    }
  ];

  return (
    <>
      <Layout breadcrumbs={breadcrumbs}>
        <h1 className="text-2xl font-bold mb-4">{dog.name}</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Dog Details</h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dog.name}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Breed</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dog.breed}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Age</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dog.age} years</dd>
              </div>
            </dl>
          </div>
        </div>
      </Layout>
    </>
  )
}
