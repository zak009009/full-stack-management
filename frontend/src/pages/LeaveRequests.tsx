
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Filter, CheckCircle, XCircle } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';
import { LeaveRequest } from '@/types';

const getStatusBadge = (status: 'pending' | 'approved' | 'rejected') => {
  switch (status) {
    case 'approved':
      return <Badge className="bg-green-100 text-green-600 hover:bg-green-200 border-green-200">Approved</Badge>;
    case 'rejected':
      return <Badge className="bg-red-100 text-red-600 hover:bg-red-200 border-red-200">Rejected</Badge>;
    default:
      return <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200 border-yellow-200">Pending</Badge>;
  }
};

const LeaveRequests: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { leaveRequests, updateLeaveRequestStatus } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Filter leave requests based on user role and selected filter
  let filteredRequests: LeaveRequest[] = [];
  
  if (user.role === 'admin' || user.role === 'dean') {
    filteredRequests = leaveRequests;
  } else {
    filteredRequests = leaveRequests.filter(lr => lr.userId === user.id);
  }

  if (filter !== 'all') {
    filteredRequests = filteredRequests.filter(lr => lr.status === filter);
  }

  // Sort by date (newest first)
  filteredRequests.sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const handleApprove = (id: string) => {
    if (!user) return;
    updateLeaveRequestStatus(id, 'approved', user.id);
    toast({
      title: 'Leave request approved',
      description: 'The leave request has been approved successfully',
    });
  };

  const handleReject = (id: string) => {
    if (!user) return;
    updateLeaveRequestStatus(id, 'rejected', user.id);
    toast({
      title: 'Leave request rejected',
      description: 'The leave request has been rejected',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Leave Requests</h1>
            <p className="text-muted-foreground">
              {user.role === 'admin' || user.role === 'dean' 
                ? 'Manage leave requests from all staff' 
                : 'Manage your leave requests'}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  {filter === 'all' ? 'All Requests' : 
                   filter === 'pending' ? 'Pending' : 
                   filter === 'approved' ? 'Approved' : 'Rejected'}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilter('all')}>All Requests</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('pending')}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('approved')}>Approved</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('rejected')}>Rejected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Button>
            <Button onClick={() => navigate('/leave-requests/new')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {filteredRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-muted-foreground mb-2">No leave requests found</div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/leave-requests/new')}
                >
                  Request Leave
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.userName}</TableCell>
                      <TableCell className="capitalize">{request.type}</TableCell>
                      <TableCell>{formatDate(request.startDate)}</TableCell>
                      <TableCell>{formatDate(request.endDate)}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => navigate(`/leave-requests/${request.id}`)}
                          >
                            View
                          </Button>
                          
                          {(user.role === 'admin' || user.role === 'dean') && request.status === 'pending' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleApprove(request.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleReject(request.id)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default LeaveRequests;
