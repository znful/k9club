import React from "react";
import type { Club } from "@/types";

export default function EditClub({ club }: { club: Club }) {
  return (
    <>
      {club.name}
    </>
  )
}
