import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import AnnouncementForm from "@/components/announcements/AnnouncementForm";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const CreateAnnouncement: React.FC = () => {
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
          <h1 className="text-2xl font-bold">Créer une Annonce</h1>
          <p className="text-muted-foreground">
            {user.role === "admin"
              ? "Créer et publier une nouvelle annonce"
              : "Créer une nouvelle annonce pour approbation"}
          </p>
        </div>

        <AnnouncementForm />
      </div>
    </MainLayout>
  );
};

export default CreateAnnouncement;
