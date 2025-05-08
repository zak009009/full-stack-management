import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import LeaveRequestForm from "@/components/leaves/LeaveRequestForm";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const CreateLeaveRequest: React.FC = () => {
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
        <div>
          <h1 className="text-2xl font-bold">Demande de Congé</h1>
          <p className="text-muted-foreground">
            Soumettre une nouvelle demande de congé pour approbation
          </p>
        </div>

        <LeaveRequestForm />
      </div>
    </MainLayout>
  );
};

export default CreateLeaveRequest;
