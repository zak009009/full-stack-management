
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WelcomeBanner: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) return null;
  
  // Get current time to display appropriate greeting
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour >= 18) {
    greeting = "Good evening";
  }

  // Determine primary action based on user role
  let primaryAction = { label: "Request Leave", icon: Calendar, path: "/leave-requests/new" };
  
  if (user.role === 'admin') {
    primaryAction = { label: "Add Announcement", icon: PlusCircle, path: "/announcements/new" };
  } else if (user.role === 'dean') {
    primaryAction = { label: "Approve Requests", icon: Calendar, path: "/leave-requests" };
  }

  return (
    <Card className="bg-primary text-primary-foreground mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold mb-2">
              {greeting}, {user.name}
            </h1>
            <p className="text-primary-foreground/80">
              Welcome to your {user.role} dashboard. Here's an overview of your activities.
            </p>
          </div>
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={() => navigate(primaryAction.path)}
            className="shadow-md"
          >
            <primaryAction.icon className="mr-2 h-5 w-5" />
            {primaryAction.label}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
