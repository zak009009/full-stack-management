import React, { createContext, useContext, useState } from "react";
import {
  Announcement,
  LeaveRequest,
  Absence,
  Salary,
  ResearchProject,
  Notification,
  User,
  UserRole,
} from "@/types";

// Mock data for demonstration
const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    title: "Inscription au Nouveau Semestre",
    content:
      "Les inscriptions pour le nouveau semestre commencent le 1er septembre. Tous les membres du corps enseignant doivent vérifier leurs emplois du temps.",
    createdBy: "1",
    createdAt: "2023-08-15T10:00:00Z",
    approved: true,
    approvedBy: "1",
    forRoles: ["admin", "dean", "teacher", "registrar", "librarian"],
  },
  {
    id: "2",
    title: "Réunion du Corps Enseignant",
    content:
      "Une réunion du corps enseignant aura lieu le 25 août à 14h00 dans la salle principale. La présence est obligatoire pour tout le personnel enseignant.",
    createdBy: "2",
    createdAt: "2023-08-10T14:30:00Z",
    approved: true,
    approvedBy: "1",
    forRoles: ["dean", "teacher"],
  },
  {
    id: "3",
    title: "Mise à Jour du Système de Bibliothèque",
    content:
      "Le système de gestion de la bibliothèque sera mis à jour ce week-end. Les services seront indisponibles du vendredi soir au dimanche.",
    createdBy: "5",
    createdAt: "2023-08-05T09:15:00Z",
    approved: true,
    approvedBy: "1",
    forRoles: ["librarian", "teacher"],
  },
];

const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: "1",
    userId: "3",
    userName: "Prof. Smith",
    startDate: "2023-09-15T00:00:00Z",
    endDate: "2023-09-20T00:00:00Z",
    reason: "Vacances en famille",
    status: "approved",
    approvedBy: "2",
    type: "vacation",
  },
  {
    id: "2",
    userId: "4",
    userName: "Jane Registrar",
    startDate: "2023-09-10T00:00:00Z",
    endDate: "2023-09-12T00:00:00Z",
    reason: "Rendez-vous médical",
    status: "pending",
    type: "sick",
  },
  {
    id: "3",
    userId: "5",
    userName: "Mark Librarian",
    startDate: "2023-10-05T00:00:00Z",
    endDate: "2023-10-07T00:00:00Z",
    reason: "Affaire personnelle",
    status: "rejected",
    approvedBy: "1",
    type: "personal",
  },
];

const MOCK_ABSENCES: Absence[] = [
  {
    id: "1",
    userId: "3",
    userName: "Prof. Smith",
    date: "2023-08-05T00:00:00Z",
    reason: "Congé maladie",
    reported: true,
  },
  {
    id: "2",
    userId: "4",
    userName: "Jane Registrar",
    date: "2023-08-12T00:00:00Z",
    reason: "Urgence familiale",
    reported: true,
  },
  {
    id: "3",
    userId: "5",
    userName: "Mark Librarian",
    date: "2023-08-15T00:00:00Z",
    reported: false,
  },
];

const MOCK_SALARIES: Salary[] = [
  {
    id: "1",
    userId: "3",
    amount: 5000,
    month: 8,
    year: 2023,
    bonuses: 500,
    deductions: 200,
    total: 5300,
  },
  {
    id: "2",
    userId: "4",
    amount: 4000,
    month: 8,
    year: 2023,
    bonuses: 200,
    deductions: 150,
    total: 4050,
  },
  {
    id: "3",
    userId: "5",
    amount: 3800,
    month: 8,
    year: 2023,
    bonuses: 200,
    deductions: 120,
    total: 3880,
  },
];

const MOCK_RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: "1",
    title: "Applications du Machine Learning dans le Contexte Éducatif",
    description:
      "Cette recherche explore comment le machine learning peut améliorer les résultats d'apprentissage dans l'enseignement supérieur.",
    userId: "3",
    collaborators: ["2"],
    status: "ongoing",
    startDate: "2023-06-01T00:00:00Z",
    publications: ["Journal of Educational Technology, 2023"],
  },
  {
    id: "2",
    title: "Effets du Changement Climatique sur la Durabilité du Campus",
    description:
      "Étude de l'impact du changement climatique sur les initiatives de durabilité du campus universitaire.",
    userId: "3",
    collaborators: [],
    status: "planning",
    startDate: "2023-10-01T00:00:00Z",
  },
  {
    id: "3",
    title: "Accessibilité de la Bibliothèque Numérique",
    description:
      "Amélioration de l'accessibilité de la bibliothèque numérique pour les utilisateurs malvoyants.",
    userId: "5",
    collaborators: ["3"],
    status: "completed",
    startDate: "2023-01-15T00:00:00Z",
    endDate: "2023-07-30T00:00:00Z",
    publications: [
      "Library Technology Journal, 2023",
      "Conference on Digital Accessibility, 2023",
    ],
  },
];

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    userId: "3",
    message: "Votre demande de congé a été approuvée",
    read: false,
    createdAt: "2023-08-16T10:30:00Z",
    link: "/leave-requests",
  },
  {
    id: "2",
    userId: "4",
    message: "Nouvelle annonce : Réunion du Corps Enseignant",
    read: true,
    createdAt: "2023-08-10T15:00:00Z",
    link: "/announcements",
  },
  {
    id: "3",
    userId: "5",
    message: "Votre demande de congé a été rejetée",
    read: false,
    createdAt: "2023-08-17T09:45:00Z",
    link: "/leave-requests",
  },
];

interface DataContextType {
  announcements: Announcement[];
  leaveRequests: LeaveRequest[];
  absences: Absence[];
  salaries: Salary[];
  researchProjects: ResearchProject[];
  notifications: Notification[];
  addAnnouncement: (
    announcement: Omit<Announcement, "id" | "createdAt">
  ) => void;
  approveAnnouncement: (id: string, approvedBy: string) => void;
  addLeaveRequest: (leaveRequest: Omit<LeaveRequest, "id">) => void;
  updateLeaveRequestStatus: (
    id: string,
    status: "approved" | "rejected",
    approvedBy?: string
  ) => void;
  addAbsence: (absence: Omit<Absence, "id">) => void;
  reportAbsence: (id: string) => void;
  getUserNotifications: (userId: string) => Notification[];
  markNotificationAsRead: (id: string) => void;
  addResearchProject: (project: Omit<ResearchProject, "id">) => void;
  updateResearchProject: (id: string, data: Partial<ResearchProject>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [leaveRequests, setLeaveRequests] =
    useState<LeaveRequest[]>(MOCK_LEAVE_REQUESTS);
  const [absences, setAbsences] = useState<Absence[]>(MOCK_ABSENCES);
  const [salaries, setSalaries] = useState<Salary[]>(MOCK_SALARIES);
  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>(
    MOCK_RESEARCH_PROJECTS
  );
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);

  const addAnnouncement = (
    announcement: Omit<Announcement, "id" | "createdAt">
  ) => {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setAnnouncements([...announcements, newAnnouncement]);
  };

  const approveAnnouncement = (id: string, approvedBy: string) => {
    setAnnouncements(
      announcements.map((a) =>
        a.id === id ? { ...a, approved: true, approvedBy } : a
      )
    );
  };

  const addLeaveRequest = (leaveRequest: Omit<LeaveRequest, "id">) => {
    const newLeaveRequest: LeaveRequest = {
      ...leaveRequest,
      id: Date.now().toString(),
    };
    setLeaveRequests([...leaveRequests, newLeaveRequest]);
  };

  const updateLeaveRequestStatus = (
    id: string,
    status: "approved" | "rejected",
    approvedBy?: string
  ) => {
    setLeaveRequests(
      leaveRequests.map((lr) =>
        lr.id === id ? { ...lr, status, approvedBy } : lr
      )
    );

    // Add notification
    const request = leaveRequests.find((lr) => lr.id === id);
    if (request) {
      const newNotification: Notification = {
        id: Date.now().toString(),
        userId: request.userId,
        message: `Your leave request has been ${status}`,
        read: false,
        createdAt: new Date().toISOString(),
        link: "/leave-requests",
      };
      setNotifications([...notifications, newNotification]);
    }
  };

  const addAbsence = (absence: Omit<Absence, "id">) => {
    const newAbsence: Absence = {
      ...absence,
      id: Date.now().toString(),
    };
    setAbsences([...absences, newAbsence]);
  };

  const reportAbsence = (id: string) => {
    setAbsences(
      absences.map((a) => (a.id === id ? { ...a, reported: true } : a))
    );
  };

  const getUserNotifications = (userId: string) => {
    return notifications.filter((n) => n.userId === userId);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addResearchProject = (project: Omit<ResearchProject, "id">) => {
    const newProject: ResearchProject = {
      ...project,
      id: Date.now().toString(),
    };
    setResearchProjects([...researchProjects, newProject]);
  };

  const updateResearchProject = (
    id: string,
    data: Partial<ResearchProject>
  ) => {
    setResearchProjects(
      researchProjects.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  return (
    <DataContext.Provider
      value={{
        announcements,
        leaveRequests,
        absences,
        salaries,
        researchProjects,
        notifications,
        addAnnouncement,
        approveAnnouncement,
        addLeaveRequest,
        updateLeaveRequestStatus,
        addAbsence,
        reportAbsence,
        getUserNotifications,
        markNotificationAsRead,
        addResearchProject,
        updateResearchProject,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
