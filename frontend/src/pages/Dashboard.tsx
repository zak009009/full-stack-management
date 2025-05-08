import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentAnnouncements from "@/components/dashboard/RecentAnnouncements";
import LeaveRequestsList from "@/components/dashboard/LeaveRequestsList";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { canAccess } from "@/utils/auth";

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Debug logs
  console.log("Dashboard - User data:", {
    user,
    role: user.role,
    roleType: typeof user.role,
  });

  // Définir les composants en fonction des permissions
  const getRoleSpecificComponents = () => {
    const components = [];

    // DashboardStats est accessible à tous les rôles
    components.push(<DashboardStats key="stats" />);

    // Vérifier les permissions pour chaque composant
    const canViewAnnouncements = canAccess(user.role as any, "announcements");
    console.log("Can view announcements:", canViewAnnouncements);

    if (canViewAnnouncements) {
      components.push(
        <div
          key="announcements"
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          <RecentAnnouncements />
        </div>
      );
    }

    const canViewLeaveRequests = canAccess(user.role as any, "leave_requests");
    console.log("Can view leave requests:", canViewLeaveRequests);

    if (canViewLeaveRequests) {
      components.push(
        <div
          key="leave-requests"
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          <LeaveRequestsList />
        </div>
      );
    }

    console.log("Final components to render:", components.length);
    return components;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <WelcomeBanner />
        {getRoleSpecificComponents()}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
