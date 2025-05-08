import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/auth/LoginForm";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirection vers le tableau de bord si déjà connecté
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Section Héro */}
      <div className="campus-hero min-h-[60vh] flex items-center">
        <div className="container mx-auto px-6 py-12 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              UMI Gestion du Personnel
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Plateforme complète de gestion du personnel universitaire.
              Simplifiez les tâches administratives, gérez les congés, suivez
              les performances, et plus encore.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Se Connecter
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                En Savoir Plus
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Fonctionnalités */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Optimisez la Gestion Universitaire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestion des Congés</h3>
              <p className="text-gray-600">
                Demandez, suivez et approuvez les demandes de congés facilement
                grâce à un flux de travail simplifié.
              </p>
            </div>

            <div className="p-6 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Suivi des Présences
              </h3>
              <p className="text-gray-600">
                Suivez les présences du personnel, les absences et générez des
                rapports détaillés.
              </p>
            </div>

            <div className="p-6 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Annonces du Campus</h3>
              <p className="text-gray-600">
                Créez et diffusez des annonces importantes aux rôles ou
                départements spécifiques du personnel.
              </p>
            </div>

            <div className="p-6 bg-yellow-50 rounded-lg">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Gestion des Documents
              </h3>
              <p className="text-gray-600">
                Stockez et gérez en toute sécurité les documents et formulaires
                importants pour un accès facile.
              </p>
            </div>

            <div className="p-6 bg-indigo-50 rounded-lg">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Accès par Rôle</h3>
              <p className="text-gray-600">
                Tableaux de bord et fonctionnalités personnalisés selon les
                rôles du personnel pour une gestion efficace.
              </p>
            </div>

            <div className="p-6 bg-red-50 rounded-lg">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Notifications Intelligentes
              </h3>
              <p className="text-gray-600">
                Recevez des alertes et notifications en temps réel pour les
                approbations de congés, les annonces, et plus encore.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pied de page */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold">Campus Staff Central</h3>
              <p className="text-gray-400">
                Optimisation de la gestion du personnel universitaire
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                Aide
              </a>
              <a href="#" className="hover:text-blue-400">
                Confidentialité
              </a>
              <a href="#" className="hover:text-blue-400">
                Conditions
              </a>
              <a href="#" className="hover:text-blue-400">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Campus Staff Central. Tous droits
            réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
