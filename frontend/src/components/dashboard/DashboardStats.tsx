
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types';
import { 
  Users, 
  Calendar, 
  ClipboardList, 
  FileText, 
  Bell,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';

const DashboardStats: React.FC = () => {
  const { user } = useAuth();
  const { leaveRequests, absences, announcements, researchProjects, notifications } = useData();

  if (!user) return null;

  // Filter data based on user role and ID
  const userLeaveRequests = leaveRequests.filter(lr => 
    user.role === 'admin' || user.role === 'dean' || lr.userId === user.id
  );
  
  const userAbsences = absences.filter(a => 
    user.role === 'admin' || user.role === 'dean' || a.userId === user.id
  );
  
  const userAnnouncements = announcements.filter(a => 
    a.forRoles.includes(user.role) || user.role === 'admin' || user.id === a.createdBy
  );
  
  const userResearchProjects = user.role === 'teacher' ? 
    researchProjects.filter(rp => rp.userId === user.id || rp.collaborators.includes(user.id)) : 
    [];
  
  const userNotifications = notifications.filter(n => n.userId === user.id);
  const unreadNotifications = userNotifications.filter(n => !n.read);

  // Stats based on leave requests
  const approvedLeaves = userLeaveRequests.filter(lr => lr.status === 'approved').length;
  const pendingLeaves = userLeaveRequests.filter(lr => lr.status === 'pending').length;
  const rejectedLeaves = userLeaveRequests.filter(lr => lr.status === 'rejected').length;

  // Stats based on announcements
  const pendingAnnouncements = user.role === 'admin' ? 
    announcements.filter(a => !a.approved).length : 
    0;

  // Stats based on role
  const statsCards = [];

  // Common stats
  statsCards.push(
    {
      title: "Leave Requests",
      value: userLeaveRequests.length,
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Absences",
      value: userAbsences.length,
      icon: ClipboardList,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Announcements",
      value: userAnnouncements.length,
      icon: Bell,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Notifications",
      value: unreadNotifications.length,
      icon: Bell,
      color: "bg-purple-100 text-purple-600",
    }
  );

  // Role-specific stats
  if (user.role === 'admin' || user.role === 'dean') {
    statsCards.unshift({
      title: "Pending Approvals",
      value: pendingLeaves,
      icon: Clock,
      color: "bg-orange-100 text-orange-600",
    });
  }

  if (user.role === 'admin') {
    statsCards.unshift({
      title: "Pending Announcements",
      value: pendingAnnouncements,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    });
  }

  if (user.role === 'teacher') {
    statsCards.push({
      title: "Research Projects",
      value: userResearchProjects.length,
      icon: FileText,
      color: "bg-green-100 text-green-600",
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {statsCards.map((stat, index) => (
        <Card key={index} className="dashboard-stat-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Leave Request Status Stats */}
      <Card className="dashboard-stat-card col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
        <CardHeader>
          <CardTitle className="text-md font-medium">Leave Request Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100 text-green-600 mr-2">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Approved</div>
                <div className="text-xl font-semibold">{approvedLeaves}</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-amber-100 text-amber-600 mr-2">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Pending</div>
                <div className="text-xl font-semibold">{pendingLeaves}</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-red-100 text-red-600 mr-2">
                <XCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Rejected</div>
                <div className="text-xl font-semibold">{rejectedLeaves}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
