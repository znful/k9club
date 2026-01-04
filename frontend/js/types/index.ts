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

export interface Document extends BaseModel {
  title: string;
  file: string;
  uploaded_by: User;
  description?: string;
}

export interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  user_permissions: Permission[];
  groups: Array<unknown>;
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
  invitattions: Invitation[];
}

export interface ClubUser extends BaseModel {
  user: User;
  club: Club;
  role: Role;
  permissions: Permission[];
}

export interface Invitation extends BaseModel {
  email: string;
  club: Club;
  invited_by: User;
  token: string;
  accepted: boolean;
}

export interface Adherent extends BaseModel {
  first_name: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  occupation?: string;
  club: Club;
  notes?: string;
  documents?: Document[];
}
