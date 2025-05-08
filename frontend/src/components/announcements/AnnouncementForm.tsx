
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { UserRole } from '@/types';

const AnnouncementForm: React.FC = () => {
  const { user } = useAuth();
  const { addAnnouncement } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>(['admin', 'dean', 'teacher', 'registrar', 'librarian']);
  
  const roles: { value: UserRole, label: string }[] = [
    { value: 'admin', label: 'Administrators' },
    { value: 'dean', label: 'Deans' },
    { value: 'teacher', label: 'Teachers' },
    { value: 'registrar', label: 'Registrars' },
    { value: 'librarian', label: 'Librarians' },
  ];

  const handleRoleToggle = (role: UserRole) => {
    setSelectedRoles(prevRoles => {
      if (prevRoles.includes(role)) {
        return prevRoles.filter(r => r !== role);
      } else {
        return [...prevRoles, role];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    if (selectedRoles.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No roles selected',
        description: 'Please select at least one role for this announcement',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Automatically approve if user is admin
    const isApproved = user.role === 'admin';
    
    // Create the announcement
    addAnnouncement({
      title,
      content,
      createdBy: user.id,
      approved: isApproved,
      approvedBy: isApproved ? user.id : undefined,
      forRoles: selectedRoles,
    });
    
    toast({
      title: isApproved ? 'Announcement published' : 'Announcement submitted',
      description: isApproved 
        ? 'Your announcement has been published' 
        : 'Your announcement has been submitted for approval',
    });
    
    navigate('/announcements');
  };

  if (!user) return null;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Announcement</CardTitle>
        <CardDescription>
          {user.role === 'admin' 
            ? 'Create and publish a new announcement' 
            : 'Create a new announcement for approval'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Announcement Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the announcement content"
              required
              rows={6}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Visible to</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {roles.map((role) => (
                <div key={role.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`role-${role.value}`} 
                    checked={selectedRoles.includes(role.value)}
                    onCheckedChange={() => handleRoleToggle(role.value)}
                  />
                  <Label htmlFor={`role-${role.value}`} className="cursor-pointer">
                    {role.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/announcements')}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || selectedRoles.length === 0}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {user.role === 'admin' ? 'Publishing...' : 'Submitting...'}
                </>
              ) : (
                user.role === 'admin' ? 'Publish' : 'Submit for Approval'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AnnouncementForm;
