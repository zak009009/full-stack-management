import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentAnnouncements from "@/components/dashboard/RecentAnnouncements";
import LeaveRequestsList from "@/components/dashboard/LeaveRequestsList";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <WelcomeBanner />
        <DashboardStats />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <RecentAnnouncements />
          <LeaveRequestsList />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
