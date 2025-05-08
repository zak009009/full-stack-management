import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LeaveRequest } from "@/types";

const getStatusBadge = (status: "pending" | "approved" | "rejected") => {
  switch (status) {
    case "approved":
      return (
        <Badge className="bg-green-100 text-green-600 hover:bg-green-200 border-green-200">
          Approuvé
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-600 hover:bg-red-200 border-red-200">
          Rejeté
        </Badge>
      );
    default:
      return (
        <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200 border-yellow-200">
          En attente
        </Badge>
      );
  }
};

const LeaveRequestsList: React.FC = () => {
  const { leaveRequests } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  // Filter leave requests based on user role
  let filteredRequests: LeaveRequest[] = [];

  if (user.role === "admin" || user.role === "dean") {
    // Admin and Dean can see all pending requests and their own requests
    filteredRequests = leaveRequests
      .filter((lr) => lr.status === "pending" || lr.userId === user.id)
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
  } else {
    // Other users can only see their own requests
    filteredRequests = leaveRequests
      .filter((lr) => lr.userId === user.id)
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
  }

  // Get only recent 5 requests
  const recentRequests = filteredRequests.slice(0, 5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Demandes de Congé</CardTitle>
          <CardDescription>
            {user.role === "admin" || user.role === "dean"
              ? "Demandes de congé récentes nécessitant une approbation"
              : "Vos demandes de congé récentes"}
          </CardDescription>
        </div>
        <Button variant="outline" onClick={() => navigate("/leave-requests")}>
          Voir Tout
        </Button>
      </CardHeader>
      <CardContent>
        {recentRequests.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucune demande de congé disponible
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employé</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.userName}</TableCell>
                  <TableCell className="capitalize">{request.type}</TableCell>
                  <TableCell>
                    {formatDate(request.startDate)} -{" "}
                    {formatDate(request.endDate)}
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/leave-requests/${request.id}`)}
                    >
                      Voir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default LeaveRequestsList;
