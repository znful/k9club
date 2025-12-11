import { type LucideIcon } from "lucide-react";
import { type InertiaLinkProps } from "@inertiajs/react";

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  href: NonNullable<InertiaLinkProps["href"]>;
  icon?: LucideIcon | null;
  isActive?: boolean;
}
export interface SharedData {
  sidebarOpen: boolean;
  [key: string]: unknown;
}

interface BaseModel {
  id: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
}

export interface Permission {
  name: string;
  codename: string;
}

export interface Role extends BaseModel {
  name: string;
  description: string;
  permissions: Permission[];
  club: Club;
}

export interface Club extends BaseModel {
  name: string;
  slug: string;
  description: string;
  owner: User;
  members: User[];
}

export interface ClubUser extends BaseModel {
  user: User;
  club: Club;
  role: Role;
  permissions: Permission[];
}
