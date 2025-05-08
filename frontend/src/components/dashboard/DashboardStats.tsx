import React from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { canAccess } from "@/utils/auth";
import {
  Users,
  Calendar,
  Bell,
  FileText,
  Book,
  ClipboardList,
} from "lucide-react";

const DashboardStats: React.FC = () => {
  const { user } = useAuth();
  const {
    leaveRequests,
    absences,
    announcements,
    notifications,
    researchProjects,
  } = useData();

  const statsCards = [];

  // Statistiques de base pour tous les rôles
  statsCards.push(
    {
      title: "Absences",
      value: absences.length.toString(),
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Annonces",
      value: announcements.length.toString(),
      icon: <Bell className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      title: "Notifications",
      value: notifications.length.toString(),
      icon: <Bell className="h-6 w-6" />,
      color: "bg-yellow-500",
    }
  );

  // Statistiques spécifiques aux rôles
  if (canAccess(user?.role as any, "leave_requests")) {
    const pendingRequests = leaveRequests.filter(
      (request) => request.status === "pending"
    );
    statsCards.unshift({
      title: "Approbations en Attente",
      value: pendingRequests.length.toString(),
      icon: <FileText className="h-6 w-6" />,
      color: "bg-red-500",
    });
  }

  if (canAccess(user?.role as any, "research_projects")) {
    const userProjects = researchProjects.filter(
      (project) => project.userId === user?.id
    );
    statsCards.push({
      title: "Projets de Recherche",
      value: userProjects.length.toString(),
      icon: <Users className="h-6 w-6" />,
      color: "bg-purple-500",
    });
  }

  if (canAccess(user?.role as any, "library_management")) {
    statsCards.push({
      title: "Livres Empruntés",
      value: "0", // À implémenter
      icon: <Book className="h-6 w-6" />,
      color: "bg-indigo-500",
    });
  }

  if (canAccess(user?.role as any, "student_registration")) {
    statsCards.push({
      title: "Inscriptions en Cours",
      value: "0", // À implémenter
      icon: <ClipboardList className="h-6 w-6" />,
      color: "bg-pink-500",
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.color}`}>{stat.icon}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
