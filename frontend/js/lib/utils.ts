import type { InertiaLinkProps } from "@inertiajs/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isSameUrl(
  url1: NonNullable<InertiaLinkProps["href"]>,
  url2: NonNullable<InertiaLinkProps["href"]>,
) {
  return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: NonNullable<InertiaLinkProps["href"]>): string {
  return typeof url === "string" ? url : url.url;
}

export const SECONDS = 1000;
export const MINUTES = 60 * SECONDS;
