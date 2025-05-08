export type UserRole =
  | "Administrateur"
  | "Doyen"
  | "Enseignant"
  | "Scolarité"
  | "Bibliothécaire";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  profileImage?: string;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
  approved: boolean;
  approvedBy?: string;
  forRoles: UserRole[];
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
  type: "vacation" | "sick" | "personal" | "other";
}

export interface Absence {
  id: string;
  userId: string;
  userName: string;
  date: string;
  reason?: string;
  reported: boolean;
}

export interface Salary {
  id: string;
  userId: string;
  amount: number;
  month: number;
  year: number;
  bonuses: number;
  deductions: number;
  total: number;
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  userId: string;
  collaborators: string[];
  status: "planning" | "ongoing" | "completed";
  startDate: string;
  endDate?: string;
  publications?: string[];
}
