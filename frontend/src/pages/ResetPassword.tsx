
import React from 'react';
import PasswordResetForm from '@/components/auth/PasswordResetForm';

const ResetPassword: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <PasswordResetForm />
      </div>
    </div>
  );
};

export default ResetPassword;
