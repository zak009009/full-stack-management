import { UserRole } from "@/types";

// Définir les permissions pour chaque rôle
const rolePermissions = {
  Administrateur: [
    "view_dashboard",
    "manage_users",
    "manage_announcements",
    "manage_leave_requests",
    "manage_absences",
    "manage_research_projects",
    "manage_library",
    "manage_registrations",
    "view_all_data",
    "approve_announcements",
    "approve_leave_requests",
  ],
  Doyen: [
    "view_dashboard",
    "manage_announcements",
    "manage_leave_requests",
    "manage_absences",
    "manage_research_projects",
    "view_all_data",
    "approve_leave_requests",
  ],
  Enseignant: [
    "view_dashboard",
    "view_announcements",
    "manage_own_leave_requests",
    "manage_own_absences",
    "manage_own_research_projects",
    "view_own_data",
  ],
  Scolarité: [
    "view_dashboard",
    "view_announcements",
    "manage_registrations",
    "view_registration_data",
  ],
  Bibliothécaire: [
    "view_dashboard",
    "view_announcements",
    "manage_library",
    "view_library_data",
  ],
};

// Vérifier si un utilisateur a une permission spécifique
export const hasPermission = (
  userRole: UserRole,
  permission: string
): boolean => {
  console.log("Checking permission:", {
    userRole,
    permission,
    availableRoles: Object.keys(rolePermissions),
    rolePermissions: rolePermissions[userRole],
  });

  const permissions = rolePermissions[userRole] || [];
  const hasPermission = permissions.includes(permission);

  console.log("Permission check result:", {
    userRole,
    permission,
    hasPermission,
    availablePermissions: permissions,
  });

  return hasPermission;
};

// Vérifier si un utilisateur peut accéder à une fonctionnalité
export const canAccess = (userRole: UserRole, feature: string): boolean => {
  console.log("Checking access:", {
    userRole,
    feature,
    roleType: typeof userRole,
  });

  let canAccess = false;

  switch (feature) {
    case "dashboard":
      canAccess = hasPermission(userRole, "view_dashboard");
      break;
    case "users":
      canAccess = hasPermission(userRole, "manage_users");
      break;
    case "announcements":
      canAccess =
        hasPermission(userRole, "manage_announcements") ||
        hasPermission(userRole, "view_announcements");
      break;
    case "leave_requests":
      canAccess =
        hasPermission(userRole, "manage_leave_requests") ||
        hasPermission(userRole, "manage_own_leave_requests");
      break;
    case "absences":
      canAccess =
        hasPermission(userRole, "manage_absences") ||
        hasPermission(userRole, "manage_own_absences");
      break;
    case "research_projects":
      canAccess =
        hasPermission(userRole, "manage_research_projects") ||
        hasPermission(userRole, "manage_own_research_projects");
      break;
    case "library_management":
      canAccess = hasPermission(userRole, "manage_library");
      break;
    case "student_registration":
      canAccess = hasPermission(userRole, "manage_registrations");
      break;
    default:
      canAccess = false;
  }

  console.log("Access check result:", {
    userRole,
    feature,
    canAccess,
  });

  return canAccess;
};

// Vérifier si un utilisateur peut gérer une ressource spécifique
export const canManageResource = (
  userRole: UserRole,
  resourceType: string,
  resourceUserId?: string,
  currentUserId?: string
): boolean => {
  if (!currentUserId) return false;

  // Les administrateurs peuvent tout gérer
  if (userRole === "Administrateur") return true;

  // Les doyens peuvent gérer les ressources de leur département
  if (userRole === "Doyen") {
    return hasPermission(userRole, `manage_${resourceType}`);
  }

  // Les autres rôles ne peuvent gérer que leurs propres ressources
  return (
    hasPermission(userRole, `manage_own_${resourceType}`) &&
    resourceUserId === currentUserId
  );
};
