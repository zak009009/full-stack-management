
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Navigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Salary as SalaryType } from '@/types';

const Salary: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { salaries } = useData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Filter salaries based on user role
  const userSalaries = user.role === 'admin' 
    ? salaries 
    : salaries.filter(s => s.userId === user.id);
  
  // Sort by date (newest first)
  userSalaries.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getMonthName = (month: number) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month - 1];
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Salary Information</h1>
          <p className="text-muted-foreground">
            {user.role === 'admin' 
              ? 'Manage staff salary records' 
              : 'View your salary records'}
          </p>
        </div>

        {/* Current Month Salary Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-3">
            <CardHeader className="pb-3">
              <CardTitle>Salary Breakdown</CardTitle>
              <CardDescription>
                Overview of your salary components
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              {userSalaries.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardDescription>Base Salary</CardDescription>
                      <CardTitle className="text-2xl">
                        {formatCurrency(userSalaries[0].amount)}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardDescription>Bonuses</CardDescription>
                      <CardTitle className="text-2xl text-green-600">
                        +{formatCurrency(userSalaries[0].bonuses)}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardDescription>Deductions</CardDescription>
                      <CardTitle className="text-2xl text-red-600">
                        -{formatCurrency(userSalaries[0].deductions)}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="bg-primary text-primary-foreground">
                    <CardHeader className="pb-2">
                      <CardDescription className="text-primary-foreground/80">Total Pay</CardDescription>
                      <CardTitle className="text-2xl">
                        {formatCurrency(userSalaries[0].total)}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No salary information available
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Salary History */}
        <Card>
          <CardHeader>
            <CardTitle>Salary History</CardTitle>
            <CardDescription>
              Your historical salary records
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userSalaries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No salary history available
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Base Salary</TableHead>
                    <TableHead>Bonuses</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userSalaries.map((salary) => (
                    <TableRow key={salary.id}>
                      <TableCell className="font-medium">
                        {getMonthName(salary.month)} {salary.year}
                      </TableCell>
                      <TableCell>{formatCurrency(salary.amount)}</TableCell>
                      <TableCell className="text-green-600">
                        +{formatCurrency(salary.bonuses)}
                      </TableCell>
                      <TableCell className="text-red-600">
                        -{formatCurrency(salary.deductions)}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(salary.total)}
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

export default Salary;
