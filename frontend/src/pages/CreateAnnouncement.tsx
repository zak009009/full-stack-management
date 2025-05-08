
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AnnouncementForm from '@/components/announcements/AnnouncementForm';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const CreateAnnouncement: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Create Announcement</h1>
          <p className="text-muted-foreground">
            {user.role === 'admin' 
              ? 'Create and publish a new announcement' 
              : 'Create a new announcement for approval'}
          </p>
        </div>
        
        <AnnouncementForm />
      </div>
    </MainLayout>
  );
};

export default CreateAnnouncement;
