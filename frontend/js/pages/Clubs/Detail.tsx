import React from "react";
import Layout from "@/layouts/app-layout";
import type { BreadcrumbItem, Club } from "@/types";
import { Form, Link } from "@inertiajs/react";
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
        <div className="mt-4">
          <Form method="POST" action={`/clubs/${club.slug}/edit/`}>
            {({ processing }) => (
              <>
                <div className="space-y-6">
                  <header>
                    <h3 className="mb-0.5 text-base font-medium">Edit club</h3>
                    <p className="text-sm text-muted-foreground">Update your club&apos;s name and details</p>
                  </header>

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
                </div>
              </>
            )}
          </Form>
        </div>
        <div className="space-y-6 mt-6">
          <header>
            <h3 className="mb-0.5 text-base font-medium">Delete club</h3>
            <p className="text-sm text-muted-foreground">Delete your club and all of its resources</p>
          </header>
          <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
            <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
              <p className="font-medium">Warning</p><p className="text-sm">Please proceed with caution, this cannot be undone.</p>
            </div>
            <Link href={`/clubs/${club.slug}/delete/`} method="delete" as={Button} variant="destructive">
              Delete club
            </Link>
          </div>
        </div>
      </Layout>
    </>
  )
}
