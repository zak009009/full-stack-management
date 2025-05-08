import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const Login: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to dashboard
  React.useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image and Message */}
      <div className="hidden lg:flex lg:w-1/2 auth-gradient items-center justify-center">
        <div className="p-12 max-w-lg text-white">
          <h1 className="text-4xl font-bold mb-4">
            Bienvenue sur Campus Staff Central
          </h1>
          <p className="text-xl mb-6">
            Connectez-vous pour accéder à votre tableau de bord personnalisé et
            gérer vos tâches universitaires.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Gestion des Congés</h3>
                <p className="text-white/80">
                  Demander et suivre les demandes de congés
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Informations Salariales</h3>
                <p className="text-white/80">
                  Consulter les détails du salaire et l'historique des paiements
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Annonces</h3>
                <p className="text-white/80">
                  Restez informé des actualités du campus
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Connexion</h2>
            <p className="text-gray-600 mt-2">
              Connectez-vous pour accéder à votre tableau de bord
            </p>
          </div>
          <LoginForm />
          <div className="mt-8 text-center">
            <Button
              variant="link"
              className="text-gray-600"
              onClick={() => navigate("/")}
            >
              Retour à l'Accueil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
