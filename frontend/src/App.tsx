import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import LeaveRequests from "./pages/LeaveRequests";
import CreateLeaveRequest from "./pages/CreateLeaveRequest";
import Announcements from "./pages/Announcements";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import Absences from "./pages/Absences";
import Salary from "./pages/Salary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Leave Requests Routes */}
              <Route path="/leave-requests" element={<LeaveRequests />} />
              <Route path="/leave-requests/new" element={<CreateLeaveRequest />} />
              
              {/* Announcements Routes */}
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/announcements/new" element={<CreateAnnouncement />} />
              
              {/* Other Feature Routes */}
              <Route path="/absences" element={<Absences />} />
              <Route path="/salary" element={<Salary />} />
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
