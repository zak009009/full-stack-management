import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WelcomeBanner: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  // Get current time to display appropriate greeting
  const currentHour = new Date().getHours();
  let greeting = "Bonjour";

  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Bon après-midi";
  } else if (currentHour >= 18) {
    greeting = "Bonsoir";
  }

  // Determine primary action based on user role
  let primaryAction = {
    label: "Demander une permission",
    icon: Calendar,
    path: "/leave-requests/new",
  };

  if (user.role === "admin") {
    primaryAction = {
      label: "Ajouter une annonce",
      icon: PlusCircle,
      path: "/announcements/new",
    };
  } else if (user.role === "dean") {
    primaryAction = {
      label: "Approuver les demandes",
      icon: Calendar,
      path: "/leave-requests",
    };
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
              Bienvenu a votre role {user.role} dashboard. Ici vous pouvez
              visualiser vos activites
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
