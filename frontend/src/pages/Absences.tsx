import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Navigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Filter, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Absence } from "@/types";

const Absences: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { absences, reportAbsence } = useData();
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | "reported" | "unreported">(
    "all"
  );

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Filter absences based on user role and selected filter
  let filteredAbsences: Absence[] = [];

  if (user.role === "admin" || user.role === "dean") {
    filteredAbsences = absences;
  } else {
    filteredAbsences = absences.filter((a) => a.userId === user.id);
  }

  if (filter === "reported") {
    filteredAbsences = filteredAbsences.filter((a) => a.reported);
  } else if (filter === "unreported") {
    filteredAbsences = filteredAbsences.filter((a) => !a.reported);
  }

  // Sort by date (newest first)
  filteredAbsences.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const handleReport = (id: string) => {
    reportAbsence(id);
    toast({
      title: "Absence signalée",
      description: "L'absence a été marquée comme signalée",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Absences</h1>
            <p className="text-muted-foreground">
              {user.role === "admin" || user.role === "dean"
                ? "Consulter et gérer les absences du personnel"
                : "Consulter vos absences"}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  {filter === "all"
                    ? "Toutes les Absences"
                    : filter === "reported"
                    ? "Signalées"
                    : "Non Signalées"}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilter("all")}>
                    Toutes les Absences
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("reported")}>
                    Signalées
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("unreported")}>
                    Non Signalées
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {filteredAbsences.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-muted-foreground mb-2">
                  Aucune absence trouvée
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employé</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Motif</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAbsences.map((absence) => (
                    <TableRow key={absence.id}>
                      <TableCell className="font-medium">
                        {absence.userName}
                      </TableCell>
                      <TableCell>{formatDate(absence.date)}</TableCell>
                      <TableCell>
                        {absence.reason || "Aucun motif fourni"}
                      </TableCell>
                      <TableCell>
                        {absence.reported ? (
                          <Badge className="bg-green-100 text-green-600 hover:bg-green-200 border-green-200">
                            Signalée
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200 border-yellow-200">
                            Non Signalée
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {!absence.reported && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleReport(absence.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Marquer comme Signalée
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Absences;
