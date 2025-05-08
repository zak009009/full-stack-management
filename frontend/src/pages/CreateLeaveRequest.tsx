
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import LeaveRequestForm from '@/components/leaves/LeaveRequestForm';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const CreateLeaveRequest: React.FC = () => {
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
          <h1 className="text-2xl font-bold">Request Leave</h1>
          <p className="text-muted-foreground">
            Submit a new leave request for approval
          </p>
        </div>
        
        <LeaveRequestForm />
      </div>
    </MainLayout>
  );
};

export default CreateLeaveRequest;
