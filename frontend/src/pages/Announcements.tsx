import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Filter, CheckCircle, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

const Announcements: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { announcements, approveAnnouncement } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Filter announcements based on user role and selected filter
  let filteredAnnouncements = [...announcements];

  // Filter by role access
  if (user.role !== "admin") {
    filteredAnnouncements = filteredAnnouncements.filter(
      (a) =>
        (a.approved && a.forRoles.includes(user.role)) ||
        a.createdBy === user.id
    );
  }

  // Apply status filter
  if (filter === "pending") {
    filteredAnnouncements = filteredAnnouncements.filter((a) => !a.approved);
  } else if (filter === "approved") {
    filteredAnnouncements = filteredAnnouncements.filter((a) => a.approved);
  }

  // Sort by date (newest first)
  filteredAnnouncements.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleApprove = (id: string) => {
    if (!user || user.role !== "admin") return;
    approveAnnouncement(id, user.id);
    toast({
      title: "Annonce approuvée",
      description: "L'annonce a été publiée avec succès",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
  };

  const truncateContent = (content: string, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Annonces</h1>
            <p className="text-muted-foreground">
              {user.role === "admin"
                ? "Gérer et approuver les annonces du campus"
                : "Voir les annonces du campus et créer les vôtres"}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  {filter === "all"
                    ? "Toutes les Annonces"
                    : filter === "pending"
                    ? "En Attente"
                    : "Approuvées"}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilter("all")}>
                    Toutes les Annonces
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem onClick={() => setFilter("pending")}>
                      En Attente
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => setFilter("approved")}>
                    Approuvées
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Button>
            <Button onClick={() => navigate("/announcements/new")}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvelle Annonce
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredAnnouncements.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-muted-foreground mb-2">
                  Aucune annonce trouvée
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/announcements/new")}
                >
                  Créer une Annonce
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredAnnouncements.map((announcement) => (
              <Card key={announcement.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{announcement.title}</CardTitle>
                      <CardDescription>
                        {formatDate(announcement.createdAt)}
                      </CardDescription>
                    </div>
                    <div>
                      {!announcement.approved ? (
                        <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200 border-yellow-200">
                          En Attente
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-600 hover:bg-green-200 border-green-200">
                          Publiée
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-4">
                  <p className="text-muted-foreground mb-4">
                    {truncateContent(announcement.content)}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1">
                      {announcement.forRoles.map((role) => (
                        <Badge
                          key={role}
                          variant="outline"
                          className="capitalize"
                        >
                          {role === "admin"
                            ? "Administrateurs"
                            : role === "dean"
                            ? "Doyens"
                            : role === "teacher"
                            ? "Enseignants"
                            : role === "registrar"
                            ? "Secrétaires"
                            : "Bibliothécaires"}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {user.role === "admin" && !announcement.approved && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleApprove(announcement.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approuver
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          navigate(`/announcements/${announcement.id}`)
                        }
                        className="text-blue-600"
                      >
                        Lire la Suite
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Announcements;
