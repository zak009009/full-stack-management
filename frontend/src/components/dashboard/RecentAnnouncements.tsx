
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecentAnnouncements: React.FC = () => {
  const { announcements } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  // Filter announcements relevant to the user's role
  const userAnnouncements = announcements
    .filter(a => a.approved && a.forRoles.includes(user.role))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3); // Get only the 3 most recent

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Announcements</CardTitle>
          <CardDescription>Latest updates for you</CardDescription>
        </div>
        <Button variant="outline" onClick={() => navigate('/announcements')}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {userAnnouncements.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No announcements available
          </div>
        ) : (
          <div className="space-y-6">
            {userAnnouncements.map((announcement) => (
              <div key={announcement.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{announcement.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </Badge>
                </div>
                <p className="text-muted-foreground line-clamp-2 mb-2">{announcement.content}</p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-blue-600"
                  onClick={() => navigate(`/announcements/${announcement.id}`)}
                >
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentAnnouncements;
