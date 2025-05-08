import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2, Calendar } from "lucide-react";

const LeaveRequestForm: React.FC = () => {
  const { user } = useAuth();
  const { addLeaveRequest } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveType, setLeaveType] = useState<
    "vacation" | "sick" | "personal" | "other"
  >("vacation");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    setIsSubmitting(true);

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      toast({
        variant: "destructive",
        title: "Plage de dates invalide",
        description: "La date de fin doit être postérieure à la date de début",
      });
      setIsSubmitting(false);
      return;
    }

    // Create the leave request
    addLeaveRequest({
      userId: user.id,
      userName: user.name,
      startDate,
      endDate,
      reason,
      status: "pending",
      type: leaveType,
    });

    toast({
      title: "Demande de congé soumise",
      description: "Votre demande a été soumise pour approbation",
    });

    navigate("/leave-requests");
  };

  if (!user) return null;

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Demande de Congé</CardTitle>
        <CardDescription>
          Soumettre une nouvelle demande de congé pour approbation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="leaveType">Type de Congé</Label>
            <Select
              value={leaveType}
              onValueChange={(value: any) => setLeaveType(value)}
            >
              <SelectTrigger id="leaveType">
                <SelectValue placeholder="Sélectionner le type de congé" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vacation">Vacances</SelectItem>
                <SelectItem value="sick">Congé Maladie</SelectItem>
                <SelectItem value="personal">Congé Personnel</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de Début</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Date de Fin</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Motif</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Veuillez fournir des détails sur votre demande de congé"
              required
              rows={4}
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/leave-requests")}
              className="mr-2"
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Soumettre la Demande"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeaveRequestForm;
