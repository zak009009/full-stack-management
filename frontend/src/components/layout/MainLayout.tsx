import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Menu,
  X,
  LogOut,
  User,
  ChevronDown,
  Home,
  Calendar,
  ClipboardList,
  Users,
  BookOpen,
  FileText,
  DollarSign,
  BellRing,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/context/DataContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserRole } from "@/types";

interface MainLayoutProps {
  children: React.ReactNode;
}

// Helper function to get the icon for the user role
const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case "admin":
      return Users;
    case "dean":
      return Users;
    case "teacher":
      return BookOpen;
    case "registrar":
      return ClipboardList;
    case "librarian":
      return BookOpen;
    default:
      return User;
  }
};

// Get menu items based on user role
const getMenuItems = (role: UserRole) => {
  const commonItems = [
    { label: "Dashboard", icon: Home, path: "/dashboard" },
    { label: "Leave Requests", icon: Calendar, path: "/leave-requests" },
    { label: "Absences", icon: ClipboardList, path: "/absences" },
    { label: "Salary", icon: DollarSign, path: "/salary" },
    { label: "Announcements", icon: BellRing, path: "/announcements" },
  ];

  switch (role) {
    case "admin":
      return [
        ...commonItems,
        { label: "Manage Users", icon: Users, path: "/users" },
      ];
    case "dean":
      return [
        ...commonItems,
        { label: "Department", icon: Users, path: "/department" },
      ];
    case "teacher":
      return [
        ...commonItems,
        { label: "Research", icon: FileText, path: "/research" },
      ];
    case "registrar":
      return commonItems;
    case "librarian":
      return [
        ...commonItems,
        { label: "Library", icon: BookOpen, path: "/library" },
      ];
    default:
      return commonItems;
  }
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { notifications } = useData();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const userNotifications = user
    ? notifications.filter((n) => n.userId === user.id && !n.read)
    : [];

  const menuItems = user ? getMenuItems(user.role) : [];
  const RoleIcon = user ? getRoleIcon(user.role) : User;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-200 ease-in-out lg:translate-x-0 border-r",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center role-icon role-${user.role}`}
              >
                <RoleIcon className="h-5 w-5" />
              </div>
              <span className="ml-2 font-semibold">Campus Staff Portal</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar Content */}
          <ScrollArea className="flex-grow">
            <div className="py-4 px-3">
              <div className="mb-6">
                <div className="flex items-center px-3 py-2 rounded-md bg-sidebar-accent">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </div>
          </ScrollArea>

          {/* Sidebar Footer */}
          <div className="border-t p-4">
            <Button
              variant="outline"
              className="w-full flex items-center"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-200 ease-in-out",
          sidebarOpen ? "lg:ml-64" : "ml-0"
        )}
      >
        {/* Top Bar */}
        <header className="h-16 border-b bg-white flex items-center px-4 sticky top-0 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="ml-auto flex items-center space-x-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {userNotifications.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      {userNotifications.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userNotifications.length === 0 ? (
                  <div className="py-4 px-2 text-center">
                    <p className="text-sm text-muted-foreground">
                      No new notifications
                    </p>
                  </div>
                ) : (
                  userNotifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="p-0">
                      <Button
                        variant="ghost"
                        className="w-full justify-start py-2 px-4 h-auto"
                        onClick={() => navigate(notification.link || "#")}
                      >
                        <div className="w-full text-left">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </Button>
                    </DropdownMenuItem>
                  ))
                )}
                {userNotifications.length > 0 && (
                  <div className="p-2 text-center border-t">
                    <Button variant="link" size="sm">
                      Mark all as read
                    </Button>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative pl-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="ml-2 hidden md:inline-block">
                    {user.name}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
