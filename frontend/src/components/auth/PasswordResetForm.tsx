import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PasswordResetForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { resetPassword, isLoading, error } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await resetPassword(email);
      toast({
        title: "Lien de réinitialisation envoyé",
        description:
          "Veuillez vérifier votre email pour les instructions de réinitialisation du mot de passe",
      });
      setSubmitted(true);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Échec de la réinitialisation",
        description:
          error || "Impossible d'envoyer les instructions de réinitialisation",
      });
    }
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Vérifiez Votre Email</CardTitle>
          <CardDescription>
            Nous avons envoyé les instructions de réinitialisation à {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="p-6 bg-muted rounded-lg mb-4">
            <p>
              Veuillez vérifier votre email et suivre les instructions pour
              réinitialiser votre mot de passe.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Vous n'avez pas reçu d'email ? Vérifiez votre dossier spam ou
            réessayez.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="/login">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la connexion
            </Link>
          </Button>
          <Button onClick={() => setSubmitted(false)}>Réessayer</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Réinitialiser Votre Mot de Passe</CardTitle>
        <CardDescription>
          Entrez votre adresse email et nous vous enverrons les instructions
          pour réinitialiser votre mot de passe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@campus.edu"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Envoyer les Instructions"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button variant="link" asChild className="mx-auto">
          <Link to="/login">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la connexion
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordResetForm;
