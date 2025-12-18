import React from "react";
import Layout from "@/layouts/app-layout";
import type { BreadcrumbItem, Club } from "@/types";
import { Form } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

export default function Detail({ club, errors }: { club: Club, errors?: Record<string, string> }) {
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
          <Form method="POST" action={`/clubs/${club.slug}/edit/`} className="flex flex-col gap-4">
            {({ processing }) => (
              <>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input name="name" defaultValue={club.name} />
                  {(errors && errors.name) && (
                    <p className="text-red-500 text-sm">{errors.name}</p>)
                  }
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input name="slug" defaultValue={club.slug} />
                  {(errors && errors.slug) && (
                    <p className="text-red-500 text-sm">{errors.slug}</p>)
                  }
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea name="description" defaultValue={club.description} />
                  {(errors && errors.description) && (
                    <p className="text-red-500 text-sm">{errors.description}</p>)
                  }
                </div>
                <div>
                  <Button type="submit" disabled={processing}>
                    {processing && <Spinner />}
                    {processing ? "Saving..." : "Save"}
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
      </Layout>
    </>
  )
}
